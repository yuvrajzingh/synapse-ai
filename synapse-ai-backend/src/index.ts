
import OpenAI from "openai";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	OPEN_AI_KEY: string;
	AI: Ai;  //being imported from wrangler.json binding
}


const app = new Hono<{Bindings: Bindings}>();


app.use(
	'/*',
	cors({
		origin: '*', //Allow requests from your Next.js app
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests', 'Content-Type'], //Add Content-type to the allowed headers to fix CORS.
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT'],
		exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
		maxAge: 600,
		credentials: true,
	})
)


// app.post('/chatToDocument', async (c) => {
// 	const openai = new OpenAI({
// 		apiKey: c.env.OPEN_AI_KEY,
// 	})

// 	const { documentData, question } = await c.req.json()
// 	const chatCompletion = await openai.chat.completions.create({
// 		messages: [
// 			{
// 				role: 'system',
// 				content: "You are a assistant helping the user to chat to a document, I am providing a JSON file of the markdown for the document. Using this, answer the users question in the clearest way possible, the document is about " + documentData,
// 			},
// 			{
// 				role: 'user',
// 				content: "My Question is: " + question
// 			},
// 		],
// 		model: "deepseek/deepseek-r1:free",
// 		temperature: 1,
// 	})

// 	const response = chatCompletion.choices[0].message.content

// 	return c.json({ message: response })
// })

app.post('/chatToDocument', async (c) => {
  // Parse input from request body
  const { documentData, question } = await c.req.json();

  // 1. Build a prompt that includes document context and the user's question
  const prompt = `The following document is provided:\n${documentData}\n\nAnswer the following question based on the document:\n${question}`;

  // 2. Run the prompt with a free WorkerAI model (e.g., Llama-2-7b chat)
  const chatResponse = await c.env.AI.run('@cf/meta/llama-2-7b-chat-fp16', {
    prompt,
    // You may specify additional parameters if required, e.g., max_length, temperature
    max_tokens: 512,
    temperature: 0.7
  });

  // Extract the answer text; adjust this as per your actual response shape
  const answer = chatResponse.response

  console.log("Chat Response -> ", answer)

  return new Response(JSON.stringify({ answer }), {
    headers: { 'Content-Type': 'application/json' },
  });
});



app.post('/translateDocument', async(c)=>{
	const {documentData, targetLang} = await c.req.json()

	//generate a summary of the document
	const summaryResponse = await c.env.AI.run('@cf/facebook/bart-large-cnn', {
		input_text: documentData,
		max_length: 1000,
	} )

	//translate the summary into another language
	const response = await c.env.AI.run('@cf/meta/m2m100-1.2b', {
		text: summaryResponse.summary,
		source_lang: 'english',
		target_lang: targetLang
	})

	return new Response(JSON.stringify(response))
})

export default app
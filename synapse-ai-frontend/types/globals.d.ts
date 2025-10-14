import { User } from "./types";

declare global {
    interface CustomJwtSessionClaims extends User{} //we are overwriting the customSessionClaims we get from clerk to the User type that we have created because by default clerk doesn't know about the custom claims that we've set up and it's type 
}
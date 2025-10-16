'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col flex-1 min-h-screen items-center justify-center bg-zinc-200 dark:bg-zinc-900 text-red-600">
      <h2 className="text-lg font-semibold">⚠️ Something went wrong!</h2>
      <p className="text-sm mt-2">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

import {createOpenAI} from "@ai-sdk/openai";
import {createGoogleGenerativeAI} from "@ai-sdk/google";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const openai = createOpenAI({
  // custom settings, e.g.
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  apiKey: process.env.OPENAI_API_KEY,
});

const model = google("models/gemini-1.5-pro-latest");
//const model = openai("gpt-4o-mini");

export {model, openai};

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getPrompt() {

	try {
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      "role": "system",
      "content": "You are a trivia application creator."
    },
    {
      "role": "user",
      "content": `Create me a random trivia question, with 4 multiple answers with one of them being correct. Return response in the following parsable JSON format:
	  {
        "question": "question",
        "answers": [
            { "text": "string", "correct": boolean },
            { "text": "string", "correct": boolean },
            { "text": "string", "correct": boolean },
            { "text": "string", "correct": boolean }
        ]
    }`
    }
  ],
  temperature: 1,
  max_tokens: 3000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
	
console.log(response.choices[0].message.content);
	}
	catch (error) {
		console.error("Error:", error.message);
}
}

getPrompt();
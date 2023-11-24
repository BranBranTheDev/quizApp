import { get } from 'http';
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
      "content": "You create fun though provoking triva questions."
    },
    {
      "role": "user",
      "content": `Create me a unique pop culture trivia question, with 4 multiple answers with one of them being correct. Return response in the following parsable JSON format:
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
  max_tokens:3050,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
	
	const questionObject = JSON.parse(response.choices[0].message.content);
	return questionObject
	}
	catch (error) {
		console.error("Error:", error.message);
}
}

async function generateTriviaQuestionArray() {
    const triviaQuestions = [];

    try {
        for (let i = 0; i < 4; i++) {
            const response = await getPrompt();

            // Add the parsed question to the array
            triviaQuestions.push(response);
        }
        return triviaQuestions;
    } catch (error) {
        console.error("Error generating trivia questions:", error.message);
        return [];
    }
}

//const object1 = [generateTriviaQuestionArray()];
//console.log(object1);

const yeet = [];
yeet.push(generateTriviaQuestionArray().then(yeet => {
    console.log(JSON.stringify(yeet, null, 2));
}).catch(error => {
    console.error(error);
}));

export { generateTriviaQuestionArray };
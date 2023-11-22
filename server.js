const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get('/trivia', async (req, res) => {
    const prompt = 'Generate a trivia question about JavaScript';
    const maxTokens = 60;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: maxTokens,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const triviaQuestion = response.data.choices[0].text.trim();
        res.send(triviaQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving trivia question.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});


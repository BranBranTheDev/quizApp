const promptModule = require('./prompt');

async function main() {
  const result = await promptModule.getPrompt();
  console.log("Received result:", result);
}

main();

let questions = [];


/*
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Orca Whale", correct: false }
        ]
    },
    {
        "question": "In which year did the Titanic sink?",
        "answers": [
            { "text": "1912", "correct": true },
            { "text": "1905", "correct": false },
            { "text": "1920", "correct": false },
            { "text": "1935", "correct": false }
        ]
    },
    {
        question: "What is the capital city of Japan?",
        answers: [
            { "text": "Beijing", "correct": false },
            { "text": "Seoul", "correct": false },
            { "text": "Tokyo", "correct": true },
            { "text": "Bangkok", "correct": false }
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { "text": "Earth", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Venus", "correct": false },
            { "text": "Jupiter", "correct": false }
        ]
    }
];
*/ 

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    };
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        resetState();
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();
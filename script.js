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
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Orca Whale", correct: false }
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
    });
}

function resetState() {
    nextBotton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    };
}

startQuiz();
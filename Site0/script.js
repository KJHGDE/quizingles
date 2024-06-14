const questions = {
    easy: [
        {
            question: "What is the plural of 'child'?",
            answers: [
                { text: "Childs", correct: false },
                { text: "Childes", correct: false },
                { text: "Children", correct: true },
                { text: "Childrens", correct: false }
            ]
        },
        {
            question: "What color is the sky?",
            answers: [
                { text: "Green", correct: false },
                { text: "Blue", correct: true },
                { text: "Red", correct: false },
                { text: "Yellow", correct: false }
            ]
        }
    ],
    medium: [
        {
            question: "Which word is a synonym for 'happy'?",
            answers: [
                { text: "Sad", correct: false },
                { text: "Joyful", correct: true },
                { text: "Angry", correct: false },
                { text: "Bored", correct: false }
            ]
        },
        {
            question: "Complete the sentence: 'She ___ to the store.'",
            answers: [
                { text: "goed", correct: false },
                { text: "gone", correct: false },
                { text: "go", correct: false },
                { text: "went", correct: true }
            ]
        }
    ],
    hard: [
        {
            question: "What is the past participle of 'write'?",
            answers: [
                { text: "Writed", correct: false },
                { text: "Wrote", correct: false },
                { text: "Written", correct: true },
                { text: "Writing", correct: false }
            ]
        },
        {
            question: "Choose the correct form: 'She has ___ a letter.'",
            answers: [
                { text: "writed", correct: false },
                { text: "written", correct: true },
                { text: "writing", correct: false },
                { text: "wrote", correct: false }
            ]
        }
    ]
};

let currentLevel = 'easy';
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('level-selection').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentLevel][currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    questionElement.innerText = questionData.question;
    answerButtonsElement.innerHTML = '';

    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        score++;
    }
    Array.from(document.getElementById('answer-buttons').children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    document.getElementById('next-btn').classList.remove('hidden');
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentLevel].length) {
        document.getElementById('next-btn').classList.add('hidden');
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('score').innerText = `${score} / ${questions[currentLevel].length}`;
}

function restartQuiz() {
    document.getElementById('results').classList.add('hidden');
    document.getElementById('level-selection').classList.remove('hidden');
}

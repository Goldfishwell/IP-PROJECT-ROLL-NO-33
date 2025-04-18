class Quiz {
    constructor(questions, timeLimit) {
        this.questions = this.shuffle(questions);
        this.timeLimit = timeLimit;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = this.timeLimit;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    startQuiz() {
        document.getElementById("start-btn").classList.add("hidden");
        document.getElementById("quiz-container").classList.remove("hidden");
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            return this.endQuiz();
        }
        this.timeLeft = this.timeLimit;
        clearInterval(this.timer);
        this.updateTimer();
        this.timer = setInterval(() => this.updateTimer(), 1000);

        let question = this.questions[this.currentQuestionIndex];
        document.getElementById("question").innerText = question.question;
        let optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        question.options.forEach((option) => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option-btn");
            button.onclick = () => this.checkAnswer(option);
            optionsContainer.appendChild(button);
        });
    }

    updateTimer() {
        document.getElementById("timer").innerText = `Time Left: ${this.timeLeft}s`;
        if (this.timeLeft <= 0) {
            clearInterval(this.timer);
            this.nextQuestion();
        }
        this.timeLeft--;
    }

    checkAnswer(selectedOption) {
        let question = this.questions[this.currentQuestionIndex];
        if (selectedOption === question.answer) {
            this.score++;
        }
        this.nextQuestion();
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadQuestion();
    }

    endQuiz() {
        clearInterval(this.timer);
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("result").innerHTML = `Quiz Over! Your Score: ${this.score}/${this.questions.length}`;
        document.getElementById("restart-btn").classList.remove("hidden");
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.questions = this.shuffle(this.questions);
        document.getElementById("result").innerHTML = "";
        document.getElementById("restart-btn").classList.add("hidden");
        this.startQuiz();
    }
}

const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: "Paris" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Tolkien", "Rowling", "Dickens"], answer: "Shakespeare" },
    { question: "What is the square root of 16?", options: ["2", "4", "8", "16"], answer: "4" }
];

const quiz = new Quiz(questions, 10);
document.getElementById("start-btn").addEventListener("click", () => quiz.startQuiz());
document.getElementById("restart-btn").addEventListener("click", () => quiz.restartQuiz());

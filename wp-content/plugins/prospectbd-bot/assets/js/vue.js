let chatbotApp = new Vue({
    el: "#chatbotApp",
    data: {
        questions: [],
        sessionQuestions: [],
        sessionAnswers: [],
        selectedQuestion: null,
        isChatbotOpen: false,

    },
    mounted() {
        const storedSessionQuestions = JSON.parse(localStorage.getItem('sessionQuestions')) || [];
        const storedSessionAnswers = JSON.parse(localStorage.getItem('sessionAnswers')) || [];

        this.sessionQuestions = storedSessionQuestions;
        this.sessionAnswers = storedSessionAnswers;

        if (storedSessionQuestions.length > 0) {
            this.currentQuestion = storedSessionQuestions[storedSessionQuestions.length - 1];
        }

        if (storedSessionAnswers.length > 0) {
            this.currentAnswer = storedSessionAnswers[storedSessionAnswers.length - 1];
        }
        this.loadQuestions();
    },
    methods: {
        loadQuestions() {
            const file = "wp-content/plugins/prospectbd-bot/includes/questions.yaml";
            fetch(file)
                .then((response) => response.text())
                .then((yamlData) => {
                    this.questions = jsyaml.load(yamlData).questions;
                })
                .catch((error) => {
                    console.error("Error loading questions:", error);
                });
        },
        storeQuestions(question) {
            // Retrieving sessionQuestions from localStorage
            const storedSessionQuestions = JSON.parse(localStorage.getItem('sessionQuestions')) || [];

            // Adding the new question to the sessionQuestions array
            this.sessionQuestions = [...storedSessionQuestions, question.text];

            // Saving updated sessionQuestions to localStorage
            localStorage.setItem('sessionQuestions', JSON.stringify(this.sessionQuestions));

            // Logging sessionQuestions for debugging (optional)
            console.log('sessionQuestions:', this.sessionQuestions);
            this.loadAnswerForQuestion(question);
        },
        resetSessionQuestions() {
            this.sessionQuestions = [];
            this.sessionAnswers = [];
            this.selectedQuestion = null;
            localStorage.removeItem('sessionQuestions');
            localStorage.removeItem('sessionAnswers');
        },
        loadAnswerForQuestion(question) {
            const parsedQuestions = this.questions;

            // Find the question in the YAML file
            const foundQuestion = parsedQuestions.find(q => q.text === question.text);
            console.log('foundQuestion:', foundQuestion);
            // If the question is found, get its answer
            if (foundQuestion && foundQuestion.route && foundQuestion.route.answer) {
                let answer = foundQuestion.route;

                // Perform any necessary checks using all selected questions
                const selectedQuestions = this.sessionQuestions;
                // Example check: If the user has selected a specific question, modify the answer
                if (selectedQuestions.includes('Specific Question')) {
                    answer = 'Modified answer for specific question';
                }

                this.currentAnswer = answer;
            } else if (foundQuestion && foundQuestion.routes) {
                this.currentAnswer = foundQuestion.routes[0];
                console.log(this.currentAnswer);
            }

            this.sessionAnswers = [...this.sessionAnswers, this.currentAnswer];
            localStorage.setItem('sessionAnswers', JSON.stringify(this.sessionAnswers));
            console.log('sessionAnswers:', this.sessionAnswers);
        },
        toggleChatbot() {
            this.isChatbotOpen = !this.isChatbotOpen;
        },
        selectQuestion(question) {
            this.storeQuestions(question);
            this.selectedQuestion = question;
        },
        selectOption(option) {
            console.log(option);
            if (option.link) {
                this.selectedQuestion = option;
            }
        },
        handleOptionClick(option) {
            if (option.link) {
                window.open(option.link, "_blank");
            } else {
                // Handle other actions if needed
                console.log("Option clicked:", option.text);
            }
        },
    },
});

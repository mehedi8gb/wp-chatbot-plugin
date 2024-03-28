let chatbotApp = new Vue({
  el: "#chatbotApp",
  data: {
    questions: [],
    selectedQuestion: null,
    isChatbotOpen: false,
  },
  mounted() {
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
    toggleChatbot() {
      this.isChatbotOpen = !this.isChatbotOpen;
    },
    selectQuestion(question) {
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

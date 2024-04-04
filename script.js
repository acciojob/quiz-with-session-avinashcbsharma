//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || Array(questions.length).fill(null);

      // Display the quiz questions and choices
      function renderQuestions() {
        const questionsElement = document.getElementById("questions");
        for (let i = 0; i < questions.length; i++) {
          const question = questions[i];
          const questionElement = document.createElement("div");
          const questionText = document.createTextNode(question.question);
          questionElement.appendChild(questionText);
          for (let j = 0; j < question.choices.length; j++) {
            const choice = question.choices[j];
            const choiceElement = document.createElement("input");
            choiceElement.setAttribute("type", "radio");
            choiceElement.setAttribute("name", `question-${i}`);
            choiceElement.setAttribute("value", choice);
            // Check if choice is selected from session storage
            if (userAnswers[i] === choice) {
              choiceElement.setAttribute("checked", true);
            }
            // Add event listener to save user choice to session storage
            choiceElement.addEventListener("change", function() {
              userAnswers[i] = choice;
              sessionStorage.setItem("progress", JSON.stringify(userAnswers));
            });
            const choiceText = document.createTextNode(choice);
            questionElement.appendChild(choiceElement);
            questionElement.appendChild(choiceText);
          }
          questionsElement.appendChild(questionElement);
        }
      }
      renderQuestions();

      // Function to calculate and display score
      function calculateScore() {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
          if (userAnswers[i] === questions[i].answer) {
            score++;
          }
        }
        // Display score on the page
        const scoreElement = document.getElementById("score");
        scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
        // Store score in local storage
        localStorage.setItem("score", score);
      }

      // Event listener for submit button to calculate and display score
      document.getElementById("submit").addEventListener("click", calculateScore);

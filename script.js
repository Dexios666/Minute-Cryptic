
const puzzle = {
  clue: "Initially, The Heart Is Rarely Divided (5)",
  answer: "third",

  hint: "Think of the word that comes after second.",

explanation:
  '"Third" is the answer. It represents the position that comes after second. ♡'
};

let hintUsed = false;
let revealed = false;
let solved = false;

const answerEl = document.querySelector("#answer");
const feedbackEl = document.querySelector("#feedback");
const hintBtn = document.querySelector("#hint-btn");
const revealBtn = document.querySelector("#reveal-btn");
const hintStatus = document.querySelector("#hint-status");
const revealStatus = document.querySelector("#reveal-status");
const solution = document.querySelector("#solution");
const solutionText = document.querySelector("#solution-text");
const celebration = document.querySelector("#celebration");
const closeCelebrationBtn = document.querySelector("#close-celebration");
const answerForm = document.querySelector("#answer-form");

function checkAnswer(event) {
  event.preventDefault();

  if (solved) return;

  const guess = answerEl.value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  if (guess === puzzle.answer.toUpperCase()) {
    solved = true;

    answerEl.disabled = true;
    hintBtn.disabled = true;
    revealBtn.disabled = true;

    feedbackEl.textContent = "That's it! You got it. ♡";
    feedbackEl.className = "feedback success";

    solutionText.textContent = puzzle.explanation;
    solution.hidden = false;

    celebration.classList.add("show");
    celebration.setAttribute("aria-hidden", "false");

    closeCelebrationBtn.focus();
  } else {
    feedbackEl.textContent =
      "Not quite — give it another little think. You've got this! ♡";

    feedbackEl.className = "feedback error";
  }
}

answerForm.addEventListener("submit", checkAnswer);

hintBtn.addEventListener("click", () => {
  if (hintUsed || solved) return;

  hintUsed = true;

  feedbackEl.textContent = puzzle.hint;
  feedbackEl.className = "feedback";

  hintStatus.textContent = "Hint used ♡";
  hintBtn.disabled = true;
});

revealBtn.addEventListener("click", () => {
  if (revealed || solved) return;

  revealed = true;

  const firstLetter = puzzle.answer[0];

  feedbackEl.textContent =
    `A little nudge: the answer starts with "${firstLetter}".`;

  feedbackEl.className = "feedback";

  revealStatus.textContent = `First letter: ${firstLetter}`;
  revealBtn.disabled = true;
});

function closeCelebration() {
  celebration.classList.remove("show");
  celebration.setAttribute("aria-hidden", "true");

  if (solved) {
    closeCelebrationBtn.blur();
  } else {
    answerEl.focus();
  }
}

closeCelebrationBtn.addEventListener("click", closeCelebration);

celebration.addEventListener("click", (event) => {
  if (event.target === celebration) {
    closeCelebration();
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    celebration.classList.contains("show")
  ) {
    closeCelebration();
  }
});

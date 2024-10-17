// Array Of words
const words = [
  "Hello",
  "JavaScript",
  "Css",
  "Html",
  "Sass",
  "Scale",
  "Php",
  "Logic",
  "Join",
  "Task",
  "Test",
  "Function",
  "Looping",
  "Cooding",
  "XmlHttpsRequest",
  "String",
  "Number",
  "Array",
  "Object",
  "Programing",
  "FrontEnd",
  "BackEnd",
  "Devloper",
  "Container",
  "Hover",
  "Document",
  "Destructuring",
  "Anonymos",
  "Template",
  "GetHub",
];

// Catch Selectors
let lvlMsg = document.querySelector(".message .lvl");
let levelsBox = document.querySelector("#selectBox");
let secondMsg = document.querySelector(".message .second");
let box = document.querySelector(".box");
let startBtn = document.querySelector(".start");
let resetBtn = document.querySelector(".reset");
let theWord = document.querySelector(".the-word");
let input = document.querySelector("input");
let wordsContent = document.querySelector(".upcoming-word");
let timeLeft = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMsg = document.querySelector(".finish");

// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 3,
};

let defaultSecond;
secondMsg.textContent = lvls["Normal"];
scoreTotal.textContent = words.length;
timeLeft.textContent = lvls["Normal"];

// Disable Paste Event
input.onpaste = () => false;

// function select word
levelsBox.addEventListener("change", selectLevel);
function selectLevel(Event) {
  defaultSecond = lvls[Event.target.value];
  secondMsg.textContent = defaultSecond;
}

// function Start Game
startBtn.onclick = () => startOrReset("start");
resetBtn.onclick = () => startOrReset("reset");
function startOrReset(startOrReset) {
  if (startOrReset == "start") {
    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    input.focus();
    drawWords();
  } else {
    location.reload();
  }
}

// function draw words to bage
function drawWords() {
  let myWord = words[Math.floor(Math.random() * words.length)];
  let randomWords = words.sort(() => Math.random() - 0.5);
  theWord.innerHTML = myWord;
  randomWords.splice(randomWords.indexOf(myWord), 1);
  let draw = randomWords.map((el) => {
    return `
  <li>${el}</li>
  `;
  });
  wordsContent.innerHTML = draw.join("");
  checkInput();
}

function checkInput() {
  timeLeft.textContent = defaultSecond || lvls["Normal"];
  let stopTime = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == "0") {
      clearInterval(stopTime);
      if (input.value.trim().toLowerCase() == theWord.innerHTML.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          drawWords();
        } else {
          wordsContent.style.display = "none";
          input.style.display = "none";
          finishMsg.innerHTML = `<span class="good">Congartz You Are Speed Man</span>`;
        }
      } else {
        input.style.display = "none";
        wordsContent.style.display = "none";
        finishMsg.innerHTML = `<span class="bad">Game Over</span>`;
      }
    }
  }, 1000);
}

const readline = require("readline");
const logUpdate = require("log-update");
const { generateSpace } = require("./utils.js");

const state = {
  life: 100,
  time: 0,
  faim: 100,
  fun: 100,
  age: 0,
  pastis: 0,
};
const bear = ["(•ᴥ•)", "(·ᴥ·)", "(•ᴥ•)", "(ºᴥº)", "(ᵔᴥᵔ)"];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (character, key) => {
  switch (character) {
    case "m":
      donnerAManger();
      break;
    case "l":
    case "t":
    case "a":
      donnerPenalty();
      break;
    // case 'c':
    //     clean()
    // break
    case "f":
      donnerFun();
      break;
    case "d":
      donnerDrink();
      break;
  }
  // console.log(character, key)
});

rl.on("close", () => {
  process.exit(0);
});

function getBear() {
  if (state.life <= 0) {
    return "💀 🕊";
  }
  return generateSpace() + bear[Math.floor(Math.random() * bear.length)];
}

function getLifeBar() {
  if (state.life <= 0) {
    return "DEAD";
  }
  const barCompleteChar = "💓";
  const barIncompleteChar = "";
  //nombre de charactère de la bar de vie
  const total = 10;
  const plein = (state.life * 10) / 100;
  const vide = total - plein;
  const percent = " " + state.life + "%";

  return (
    new Array(Math.round(plein)).fill(barCompleteChar).join("") +
    "     " +
    new Array(Math.round(vide)).fill(barIncompleteChar).join("") +
    percent
  );
}

function getFaimBar() {
  if (state.life <= 0) {
    return "J'ai faim ta race";
  }
  const barCompleteChar = "🍔";
  const barIncompleteChar = "";
  const total = 10;
  const plein = (state.faim * 10) / 100;
  const vide = total - plein;
  const percent = " " + state.faim + "%";

  return (
    new Array(Math.round(plein)).fill(barCompleteChar).join("") +
    "     " +
    new Array(Math.round(vide)).fill(barIncompleteChar).join("") +
    percent
  );
}

function getFunBar() {
  if (state.fun <= 0) {
    return "J'me fait chier ta race";
  }
  // if (state.fun >= 100) {
  //     return 'STOP SPAMING'
  // }
  const barCompleteChar = "🎮";
  const barIncompleteChar = "";
  const total = 10;
  const plein = (state.fun * 10) / 100;
  const vide = total - plein;
  const percent = " " + state.fun + "%";

  return (
    new Array(Math.round(plein)).fill(barCompleteChar).join("") +
    "     " +
    new Array(Math.round(vide)).fill(barIncompleteChar).join("") +
    percent
  );
}

function getAge() {
  return state.age + " " + "Year old";
}

function getPastis() {
  if (state.pastis <= 100) {
    return "Jai soif ta race";
  }
  if (state.pastis > 100) {
    return "🍻🍾 JE SUIS BOURRÉ HOUHOU 🍾🍻";
  }
  return state.pastis;
}

// Conséquence lors de l'appui d'une touche
function donnerAManger() {
  state.faim = 100;
}
function donnerFun() {
  if (state.fun <= 70) {
    state.fun += 30;
  }
}
function donnerPenalty() {
  state.life -= 20;
  state.faim -= 10;
}
function donnerDrink() {
  state.pastis += 30;
}

// Gère l'affichage
setInterval(function () {
  const space = [
    getBear(),
    "",
    getLifeBar(),
    "",
    getFaimBar() + "  " + getFunBar(),
    "",
    getAge() +
      " / " +
      "Press M for eat" +
      " / " +
      "Press F for fun" +
      " / " +
      "Press d to get drunk",
    "",
    getPastis(),
  ];
  logUpdate(space.join("\n"));
}, 500);

// Gère l'état de l'ours
setInterval(function () {
  state.time += 1;

  if (state.time % 3 === 0) {
    if (state.faim > 0) {
      --state.faim;
    }
    if (state.fun > 0) {
      state.fun = state.fun - 3;
    }
    if (state.faim <= 0) {
      state.life = state.life - 10;
    }
    if (state.fun <= 0) {
      state.life--;
    }
  }

  if (state.time % 20 === 0) {
    state.age++;
  }
}, 100);

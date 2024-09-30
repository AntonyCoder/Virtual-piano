'use stricts';

function playSound(e){
  if (e.repeat) return;
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('piano-key-active');
}

const pianoKey = document.querySelectorAll(".piano-key");
const PIANO = document.getElementById("piano");

function removeActive(){
  pianoKey.forEach((elem) => {
    elem.classList.remove('piano-key-active');
  });
}

window.addEventListener('keydown', playSound);
document.addEventListener('keyup', removeActive);

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

/* новое решение */
const startSound = (event) => {
  if(event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
    event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
    event.target.classList.remove("piano-key-remove-mouse");
  }
};

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
  event.target.classList.add("piano-key-remove-mouse");
};

const startCorrespondOver = (event) => {
  event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
  event.target.classList.remove("piano-key-remove-mouse");
  pianoKey.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};

const stopCorrespondOver = () => {
  pianoKey.forEach((elem) => {
    elem.classList.remove("piano-key-active", "piano-key-active-pseudo");
    elem.classList.add("piano-key-remove-mouse");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

PIANO.addEventListener("mousedown", startCorrespondOver);
PIANO.addEventListener("mousedown", startSound);
document.addEventListener("mouseup", stopCorrespondOver);

// Notes/letters

const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');


const changeWordsNotes = () => {
  btnNotes.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');
  pianoKey.forEach((elem) => {
    elem.classList.remove('piano-key-letter');
  });
};
const changeWordsLetters = () => {
  btnNotes.classList.remove('btn-active');
  btnLetters.classList.add('btn-active');
  pianoKey.forEach((elem) => {
    elem.classList.add('piano-key-letter');
  });
};


btnLetters.addEventListener('click', changeWordsLetters);  
btnNotes.addEventListener('click', changeWordsNotes);

//fullscreen

const fullscreen = document.querySelector('.fullscreen');
const openFullscreen = () => {
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
};

fullscreen.addEventListener('click', openFullscreen);
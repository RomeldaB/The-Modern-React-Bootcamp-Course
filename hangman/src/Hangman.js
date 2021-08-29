import React, { useState } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./assets/0.jpg";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";

const maxWrong = 6;
const images = [img0, img1, img2, img3, img4, img5, img6];

function Hangman() {
  const [nWrong, setNWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord());
console.log(answer)
  const reset = () => {
    setNWrong(0);
    setGuessed(new Set());
    setAnswer(randomWord());
  }

  const guessedWord = () => {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  const handleGuess = (evt) => {
    let ltr = evt.target.value;
    setGuessed(prevGuessed => new Set([...prevGuessed, ltr]));
    setNWrong(prevNWrong => prevNWrong + (answer.includes(ltr) ? 0 : 1))
  }

  const generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  const gameOver = nWrong >= maxWrong;
  const isWinner = guessedWord().join("") === answer;
  const altText = `${nWrong}/${maxWrong} guesses`;
  let gameState = generateButtons();
  if (isWinner) gameState = "You Win!";
  if (gameOver) gameState = "You Lose!";

  return (
    <div className='Hangman'>
      <h1>Hangman</h1>
      <img src={images[nWrong]} alt={altText} />
      <p>Guessed Wrong: {nWrong}</p>
      <p className='Hangman-word'>
        {!gameOver ? guessedWord() : answer}
      </p>
      <p className='Hangman-btns'>{gameState}</p>
      {(gameOver || isWinner) && (
        <button id='reset' onClick={reset}>
          Restart?
        </button>
      )}
    </div>
  );
}

export default Hangman;

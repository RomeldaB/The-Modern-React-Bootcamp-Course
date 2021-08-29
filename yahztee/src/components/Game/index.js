import React, { useState, useEffect } from "react";
import Dice from "../Dice";
import ScoreTable from "../ScoreTable";
import "./index.css";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

function Game() {
  const [dice, setDice] = useState(Array.from({ length: NUM_DICE }));
  const [locked, setLocked] = useState(Array(NUM_DICE).fill(false));
  const [rollsLeft, setRollsLeft] = useState(NUM_ROLLS);
  const [rolling, setRolling] = useState(false);
  const [scores, setScores] = useState({
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
    threeOfKind: undefined,
    fourOfKind: undefined,
    fullHouse: undefined,
    smallStraight: undefined,
    largeStraight: undefined,
    yahtzee: undefined,
    chance: undefined
  });

  useEffect(() => {
    animateRoll();
  }, [])

  useEffect(() => {
    if(rolling) setTimeout(roll, 1000);
  }, [rolling])

  const animateRoll = () => {
    setRolling(true);
  }

  const roll = (evt) => {
    setDice(prev => prev.map((d, i) => locked[i] ? d : Math.ceil(Math.random() * 6)));
    setLocked(prev => rollsLeft > 1 ? prev : Array(NUM_DICE).fill(true));
    setRollsLeft(prev => prev - 1);
    setRolling(false);
  }

  const toggleLocked = (idx) => {
    if (rollsLeft > 0 && !rolling) {
      setLocked(prev => [
        ...prev.slice(0, idx),
        !prev[idx],
        ...prev.slice(idx + 1)
      ])
    }
  }

  const doScore = (rulename, ruleFn) => {
    setScores(prev => ({ ...prev, [rulename]: ruleFn(dice) }));
    setRollsLeft(NUM_ROLLS);
    setLocked(Array(NUM_DICE).fill(false));
    animateRoll();
  }

  const displayRollInfo = () => {
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Round"
    ];
    return messages[rollsLeft];
  }

  return (
    <div className='Game'>
      <header className='Game-header'>
        <h1 className='App-title'>Yahtzee!</h1>
        <section className='Game-dice-section'>
          <Dice
            dice={dice}
            locked={locked}
            handleClick={toggleLocked}
            disabled={rollsLeft === 0}
            rolling={rolling}
          />
          <div className='Game-button-wrapper'>
            <button
              className='Game-reroll'
              disabled={locked.every(x => x) || rollsLeft === 0 || rolling}
              onClick={animateRoll}
            >
              {displayRollInfo()}
            </button>
          </div>
        </section>
      </header>
      <ScoreTable doScore={doScore} scores={scores} />
    </div>
  );
}

export default Game;

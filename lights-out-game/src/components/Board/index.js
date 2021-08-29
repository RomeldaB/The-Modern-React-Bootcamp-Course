import React, { useState } from "react";
import Cell from "../Cell";
import "./index.css";

function Board({nrows = 5, ncols = 5, chanceLightStartsOn = 0.25}) {
  const createBoard = () => {
    const board = [];
    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  const [hasWon, setHasWon] = useState(false);
  const [gameBoard, setGameBoard] = useState(createBoard());

  const flipCellsAround = (coord) => {
    const board = [...gameBoard];
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);     // flip current cell
    flipCell(y, x - 1); // flip left
    flipCell(y, x + 1); // flip right
    flipCell(y - 1, x); // flip below
    flipCell(y + 1, x); // flip above

    let hasWon = board.every(row => row.every(cell => !cell));

    setGameBoard(board);
    setHasWon(hasWon);
  }

  const makeTable = () => {
    let tblBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={gameBoard[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className='Board'>
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }
  
  return (
    <div>
      {hasWon ? (
        <div className='winner'>
          <span className='neon-orange'>YOU</span>
          <span className='neon-blue'>WIN!</span>
        </div>
      ) : (
        <div>
          <div className='Board-title'>
            <div className='neon-orange'>Lights</div>
            <div className='neon-blue'>Out</div>
          </div>
          {makeTable()}
        </div>
      )}
    </div>
  );
}

export default Board;

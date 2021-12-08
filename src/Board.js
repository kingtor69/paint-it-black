import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.2 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let r = 0; r < nrows; r++) {
      const row=[];
      for(let c = 0; c < ncols; c++) {
        row.push((Math.random() <= chanceLightStartsOn));
      }
      initialBoard.push(row);
    };
    return initialBoard;
  };

  function hasWon() {
    const cellsOff = board.map(
      row => {
        const rowFalses = row.filter(
        on => !on)
        return rowFalses.length;
      }
    );
    const countOff = cellsOff.reduce((acc, val) => acc + val);
    console.log(countOff)
    return (countOff === 0);
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = board.map(row => row.map(cel => cel));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x-1, boardCopy);
      flipCell(y, x+1, boardCopy);
      flipCell(y-1, x, boardCopy);
      flipCell(y-1, x-1, boardCopy);
      flipCell(y-1, x+1, boardCopy);
      flipCell(y+1, x, boardCopy);
      flipCell(y+1, x-1, boardCopy);
      flipCell(y+1, x+1, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  return (
    hasWon() ? (
      <div className="Board-won">
        <h1>YOU WIN! Congratulations.</h1>
      </div>
    ) : (
      <table data-testid="Board-table">
        <thead>
          <tr>
            <th colSpan={ncols}>𝅘𝅥𝅮  &nbsp;<sup>𝅘𝅥𝅮 </sup><sub>𝅘𝅥𝅮 </sub>&nbsp;I see a red square and I want to paint it bla-ack. 𝅘𝅥𝅮  &nbsp;<sup>𝅘𝅥𝅮 </sup><sub>𝅘𝅥𝅮 </sub></th>
          </tr>
        </thead>
        <tbody>
        {
          board.map((rowOfCels, ridx) =>  (
              <tr key={`${ridx}`}>
                {rowOfCels.map((cel, cidx) => (
                  <Cell 
                    flipCellsAroundMe={flipCellsAround}
                    isLit={cel}
                    coord={`${ridx}-${cidx}`}
                    key={`${ridx}-${cidx}`}
                    />
                ))}
              </tr>
            ))
        }
        </tbody>
      </table>
    )
  );
};

export default Board;

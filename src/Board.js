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
    // TODO: check the board in state to determine whether the player has won.
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

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
  return (
    <table data-testid="Board-table">
      <thead>
        <th colspan={ncols}>𝅘𝅥𝅮  &nbsp;<sup>𝅘𝅥𝅮 </sup><sub>𝅘𝅥𝅮 </sub>&nbsp;I see a red square and I want to paint it bla-ack. 𝅘𝅥𝅮  &nbsp;<sup>𝅘𝅥𝅮 </sup><sub>𝅘𝅥𝅮 </sub></th>
      </thead>
      {
        board.map((rowOfCels, ridx) =>  (
            <tr>
              {rowOfCels.map((cel, cidx) => (
                <Cell 
                  flipCellsAroundMe={flipCellsAround}
                  isLit={cel}
                  key={`${ridx}-${cidx}`}
                  />
              ))}
            </tr>
          ))
      }
    </table>
  );
};

export default Board;

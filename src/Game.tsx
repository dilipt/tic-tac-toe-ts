import React, {useState} from 'react';
import {Board} from './Board';

function calculateWinner(squares: string[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type Move = {
  squares: string[],
}

export function Game() {
  const [gameState, setGameState] = useState({
    history: [{
      squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  });

  function jumpTo(step: number) {
    setGameState({
      xIsNext: (step % 2) === 0,
      stepNumber: step,
      history: [...gameState.history],
    });
  }

  function handleClick(i: number) {
    const history = [...gameState.history];
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = gameState.xIsNext ? 'X' : 'O';
    setGameState({
      xIsNext: !gameState.xIsNext,
      stepNumber: gameState.stepNumber + 1,
      history: gameState.history.concat([{squares}])
    })
  }
  
  const history = gameState.history;
  const current = history[gameState.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = gameState.history.map((step: Move, idx: number) => {
    const desc = idx ? `Go to move #${idx}` : 'Go to game start';
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (gameState.xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

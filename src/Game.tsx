import React, {useState} from 'react';
import styled from 'styled-components';
import {Board} from './Board';

const StyledGame = styled.article`
  display: flex;
  flex-direction: row;
`;

const GameInfo = styled.div`
  margin-left: 20px;
`;

const MovesList = styled.ul`
  padding-left: 30px;
`;

const Status = styled.div`
  margin-bottom: 10px;
`;

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

  function placeSymbol(i: number) {
    const {history} = gameState;
    const lastMove = history[history.length - 1].squares.slice();
    if (calculateWinner(lastMove) || lastMove[i] !== null) {
      return;
    }
    const nextMove = [...lastMove];
    nextMove[i] = gameState.xIsNext ? 'X' : 'O';
    setGameState({
      xIsNext: !gameState.xIsNext,
      stepNumber: gameState.stepNumber + 1,
      history: gameState.history.concat([{squares: nextMove}])
    })
  }
  
  const {history} = gameState;
  const {squares} = history[gameState.stepNumber];
  const movesList = gameState.history.map((step: {squares: string[]}, idx: number) => {
    const desc = idx ? `Go to move #${idx}` : 'Go to game start';
    return (
      <li key={idx}>
        <button onClick={() => jumpTo(idx)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(squares);
  const statusText = winner ? `Winner: ${winner}` : `Next player: ${gameState.xIsNext ? 'X' : 'O'}`;

  return (
    <StyledGame>
      <Board squares={squares} onClick={(i) => placeSymbol(i)} />
      <GameInfo>
        <Status>{statusText}</Status>
        <MovesList>{movesList}</MovesList>
      </GameInfo>
    </StyledGame>
  );
}

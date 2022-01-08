import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Board } from './Board';
import { MovesList } from './MovesList';

const StyledGame = styled.article`
  display: flex;
  flex-direction: row;
`;

const GameInfo = styled.div`
  margin-left: 20px;
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type GameStep = {
  squares: string[],
};

type GameState = {
  history: GameStep[],
  stepNumber: number,
  xIsNext: boolean,
};

export function Game() {
  const [statusText, setStatusText] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    history: [{
      squares: Array<string>(9).fill(''),
    }],
    stepNumber: 0,
    xIsNext: true,
  });

  useEffect(() => {
    const { squares } = gameState.history[gameState.stepNumber];
    const winner = calculateWinner(squares);
    if (winner) {
      setStatusText(`Winner: ${winner}`);
    } else {
      setStatusText(`Next player: ${gameState.xIsNext ? 'X' : 'O'}`);
    }
  }, [gameState]);

  const jumpTo = (step: number) => {
    setGameState({
      ...gameState,
      xIsNext: (step % 2) === 0,
      stepNumber: step,
    });
  };

  const placeSymbol = (squareIdx: number) => {
    const { history } = gameState;
    const lastMove = history[history.length - 1].squares.slice();
    if (calculateWinner(lastMove) || lastMove[squareIdx] !== '') {
      return;
    }
    const nextMove = [...lastMove];
    nextMove[squareIdx] = gameState.xIsNext ? 'X' : 'O';
    setGameState({
      xIsNext: !gameState.xIsNext,
      stepNumber: gameState.stepNumber + 1,
      history: gameState.history.concat([{ squares: nextMove }]),
    });
  };

  const { squares } = gameState.history[gameState.stepNumber];
  return (
    <StyledGame>
      <Board squares={squares} onClick={(i) => placeSymbol(i)} />
      <GameInfo>
        <Status>{statusText}</Status>
        <MovesList movesList={gameState.history} clickHandler={jumpTo} />
      </GameInfo>
    </StyledGame>
  );
}

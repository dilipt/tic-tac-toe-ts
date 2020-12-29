import React from 'react';

type SquareProps = {
  onClick: () => void,
  value: string,
};

export function Square({onClick, value}: SquareProps) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

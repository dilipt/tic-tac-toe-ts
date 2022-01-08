import React, { useState } from 'react';
import styled from 'styled-components';

type MoveHistory = {
  squares: string[],
};

type MovesListProps = {
  movesList: MoveHistory[],
  clickHandler: (idx: number) => void,
};

type MoveButtonProps = {
  selected: boolean,
};

const StyledList = styled.ul`
  padding-left: 30px;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const MoveButton = styled.button<MoveButtonProps>`
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;

export function MovesList({ movesList, clickHandler }: MovesListProps) {
  const [lastSelected, setLastSelected] = useState<number | null>(null);
  return (
    <StyledList>
      {movesList.map((move, idx) => {
        const buttonClicked = () => {
          setLastSelected(idx);
          clickHandler(idx);
        };
        return (
          <ListItem key={move.squares.join('')}>
            <MoveButton onClick={buttonClicked} selected={idx === lastSelected}>
              {`Go to ${idx === 0 ? 'start' : `move ${idx}`}`}
            </MoveButton>
          </ListItem>
        );
      })}
    </StyledList>
  );
}

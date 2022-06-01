import styled from '@emotion/styled';

import MonthCard from './MonthCard';

const CARD_LENGTH = 4;

const CardsWrapper = styled.div`
  transform: translateX(${({ translateX }) => translateX}%);
  display: flex;
  width: 400%;
  height: 100%;
  ${({ isTransitioning }) => isTransitioning && 'transition: transform 0.2s'}
`;

export default function MonthCards({
  calendarState: { today, focusMonth, translateX, isTransitioning },
  calendarDispatch,
}) {
  const curYear = today.getFullYear();
  return (
    <CardsWrapper
      onTransitionEnd={() => {
        calendarDispatch({ type: 'CARDS_TRANSITION_END' });
      }}
      translateX={translateX}
      isTransitioning={isTransitioning}
    >
      {new Array(CARD_LENGTH).fill(0).map((_, i) => (
        <MonthCard
          today={today}
          months={new Date(curYear, focusMonth - 1 + i)}
        />
      ))}
    </CardsWrapper>
  );
}

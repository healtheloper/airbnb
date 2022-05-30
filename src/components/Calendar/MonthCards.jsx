import styled from '@emotion/styled';

import widths from '@constants/widths';

import MonthCard from './MonthCard';

const CARD_LENGTH = 4;

const CardsWrapper = styled.div`
  transform: translateX(-${widths.monthCards.percent}%);
  display: flex;
  width: 400%;
  height: 100%;
`;

export default function MonthCards() {
  const today = new Date();
  const curYear = today.getFullYear();
  const curMonth = today.getMonth();
  return (
    <CardsWrapper>
      {new Array(CARD_LENGTH).fill(0).map((_, i) => (
        <MonthCard today={new Date(curYear, curMonth - 1 + i)} />
      ))}
    </CardsWrapper>
  );
}

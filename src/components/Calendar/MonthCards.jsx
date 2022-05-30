import styled from '@emotion/styled';

import widths from '@constants/widths';

import MonthCard from './MonthCard';

const CardsWrapper = styled.div`
  transform: translateX(-${widths.monthCards.percent}%);
  display: flex;
  width: 400%;
  height: 100%;
`;

export default function MonthCards() {
  return (
    <CardsWrapper>
      <MonthCard />
      <MonthCard />
      <MonthCard />
      <MonthCard />
    </CardsWrapper>
  );
}

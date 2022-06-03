import styled from '@emotion/styled';

import MonthCards from './MonthCards';
import MonthNav from './MonthNav';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 6rem;
`;

const MonthCardsWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export default function Calendar({
  calendarState,
  calendarDispatch,
  onCardElClick = () => {},
}) {
  return (
    <Wrapper>
      <MonthNav calendarDispatch={calendarDispatch} />
      <MonthCardsWrapper>
        <MonthCards
          calendarDispatch={calendarDispatch}
          calendarState={calendarState}
          onCardElClick={onCardElClick}
        />
      </MonthCardsWrapper>
    </Wrapper>
  );
}

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

export default function Calendar() {
  return (
    <Wrapper>
      <MonthNav />
      <MonthCardsWrapper>
        <MonthCards />
      </MonthCardsWrapper>
    </Wrapper>
  );
}

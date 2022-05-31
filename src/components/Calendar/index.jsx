import styled from '@emotion/styled';
import { useState } from 'react';

import widths from '@constants/widths';

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

// widths.monthCards.percent

const initTranslateX = -widths.monthCards.percent;

export default function Calendar() {
  const today = new Date();
  const [focusMonth, setFocusMonth] = useState(today.getMonth());
  const [translateX, setTranslateX] = useState(initTranslateX);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLeft, setIsLeft] = useState(false);

  const handleClickArrowBtn = arrowDirection => {
    const newIsLeft = arrowDirection === 'left';
    const diff = newIsLeft ? -1 : 1;
    setIsLeft(newIsLeft);
    setIsTransitioning(true);
    setTranslateX(translateX - widths.monthCards.percent * diff);
  };

  const handleCardsTransitionEnd = () => {
    const diff = isLeft ? -1 : 1;
    setFocusMonth(focusMonth + diff);
    setIsTransitioning(false);
    setTranslateX(initTranslateX);
  };

  return (
    <Wrapper>
      <MonthNav onArrowClick={handleClickArrowBtn} />
      <MonthCardsWrapper>
        <MonthCards
          onCardsTransitionEnd={handleCardsTransitionEnd}
          isTransitioning={isTransitioning}
          translateX={translateX}
          today={today}
          focusMonth={focusMonth}
        />
      </MonthCardsWrapper>
    </Wrapper>
  );
}

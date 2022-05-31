import styled from '@emotion/styled';
import { useReducer, useState } from 'react';

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

const initTranslateX = -widths.monthCards.percent;

const reducer = (state, { type }) => {
  switch (type) {
    case 'LEFT_ARROW_CLICK':
      return {
        ...state,
        isLeft: true,
        isTransitioning: true,
        translateX: state.translateX - widths.monthCards.percent * -1,
      };
    case 'RIGHT_ARROW_CLICK':
      return {
        ...state,
        isLeft: false,
        isTransitioning: true,
        translateX: state.translateX - widths.monthCards.percent,
      };
    case 'CARDS_TRANSITION_END':
      return {
        ...state,
        focusMonth: state.focusMonth + (state.isLeft ? -1 : 1),
        isTransitioning: false,
        translateX: initTranslateX,
      };
    default:
      throw Error('Unexpected calendar dispatch type');
  }
};

export default function Calendar() {
  const today = new Date();

  // TODO: today 가  new Date() 로 계속 호출되니까 '일' 을 기준으로 뽑아서 useMemo 하면 안될까?
  const initCalendarState = {
    focusMonth: today.getMonth(),
    translateX: initTranslateX,
    isTransitioning: false,
    isLeft: false,
  };

  const [calendarState, calendarDispatch] = useReducer(
    reducer,
    initCalendarState,
  );

  return (
    <Wrapper>
      <MonthNav calendarDispatch={calendarDispatch} />
      <MonthCardsWrapper>
        <MonthCards
          calendarDispatch={calendarDispatch}
          calendarState={calendarState}
          today={today}
        />
      </MonthCardsWrapper>
    </Wrapper>
  );
}

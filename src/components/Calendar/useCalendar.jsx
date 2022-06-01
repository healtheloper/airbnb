import { useReducer } from 'react';

import widths from '@constants/widths';

import Calendar from '.';

const initTranslateX = -widths.monthCards.percent;

function reducer(state, action) {
  switch (action.type) {
    case 'NEW_CHECK_IN':
      return {
        ...state,
        checkin: action.checkin,
        checkout: '',
      };
    case 'CHECK_OUT_UPDATE':
      return {
        ...state,
        checkout: action.checkout,
      };
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
      throw new Error('Unexpected action');
  }
}

export default function useCalendar() {
  const today = new Date();
  // TODO: today 가  new Date() 로 계속 호출되니까 '일' 을 기준으로 뽑아서 useMemo 하면 안될까?
  const initState = {
    today,
    checkin: '',
    checkout: '',
    focusMonth: today.getMonth(),
    translateX: initTranslateX,
    isTransitioning: false,
    isLeft: false,
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return { state, dispatch, Calendar };
}

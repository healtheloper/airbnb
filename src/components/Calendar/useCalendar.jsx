import { useReducer } from 'react';

import Calendar from '.';

const initState = {
  checkin: '123',
  checkout: '456',
};

function reducer(state, action) {
  switch (action.type) {
    case 'NEW_CHECK_IN':
      return {
        checkin: action.checkin,
        checkout: '',
      };
    case 'CHECK_IN_UPDATE':
      return {
        ...state,
        checkin: action.checkin,
      };
    case 'CHECK_OUT_UPDATE':
      return {
        ...state,
        checkout: action.checkout,
      };
    default:
      throw new Error('Unexpected action');
  }
}

export default function useCalendar() {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch, Calendar };
}

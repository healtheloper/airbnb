import React, { useReducer, useContext, createContext, Dispatch } from 'react';

export interface PriceState {
  initMin: number;
  initMax: number;
  min: number;
  max: number;
}

type Action =
  | { type: 'MIN_PRICE'; min: number; max: number }
  | { type: 'MAX_PRICE'; min: number; max: number }
  | {
      type: 'SET_PRICE';
      initMin: number;
      initMax: number;
      min: number;
      max: number;
    };

type PriceDispatch = Dispatch<Action>;

const initPriceState: PriceState = {
  initMin: 0,
  initMax: 0,
  min: 0,
  max: 0,
};

const PriceStateContext = createContext<PriceState | null>(null);
const PriceDispatchContext = createContext<PriceDispatch | null>(null);

function reducer(state: PriceState, action: Action): PriceState {
  switch (action.type) {
    case 'SET_PRICE':
      return {
        ...state,
        initMin: action.initMin,
        initMax: action.initMax,
        min: action.min,
        max: action.max,
      };
    case 'MIN_PRICE':
      return {
        ...state,
        min: action.min,
        max: action.max,
      };
    case 'MAX_PRICE':
      return {
        ...state,
        min: action.min,
        max: action.max,
      };
    default:
      throw new Error('Unexpected action');
  }
}
export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initPriceState);

  return (
    <PriceStateContext.Provider value={state}>
      <PriceDispatchContext.Provider value={dispatch}>
        {children}
      </PriceDispatchContext.Provider>
    </PriceStateContext.Provider>
  );
}

export function usePriceState() {
  const state = useContext(PriceStateContext);
  if (!state) throw new Error('Cannot find PriceProvider');
  return state;
}

export function usePriceDispatch() {
  const dispatch = useContext(PriceDispatchContext);
  if (!dispatch) throw new Error('Cannot find PriceProvider');
  return dispatch;
}

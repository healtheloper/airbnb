import React, { useReducer, useContext, createContext, Dispatch } from 'react';

export interface PriceState {
  initMinPrice: number;
  initMaxPrice: number;
  minPrice: number;
  maxPrice: number;
}

type Action =
  | { type: 'MIN_PRICE'; minPrice: number; maxPrice: number }
  | { type: 'MAX_PRICE'; minPrice: number; maxPrice: number }
  | {
      type: 'SET_PRICE';
      initMinPrice: number;
      initMaxPrice: number;
      minPrice: number;
      maxPrice: number;
    };

type PriceDispatch = Dispatch<Action>;

const initPriceState: PriceState = {
  initMinPrice: 0,
  initMaxPrice: 0,
  minPrice: 0,
  maxPrice: 0,
};

const PriceStateContext = createContext<PriceState | null>(null);
const PriceDispatchContext = createContext<PriceDispatch | null>(null);

function reducer(state: PriceState, action: Action): PriceState {
  switch (action.type) {
    case 'SET_PRICE':
      return {
        ...state,
        initMinPrice: action.initMinPrice,
        initMaxPrice: action.initMaxPrice,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice,
      };
    case 'MIN_PRICE':
      return {
        ...state,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice,
      };
    case 'MAX_PRICE':
      return {
        ...state,
        minPrice: action.minPrice,
        maxPrice: action.maxPrice,
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

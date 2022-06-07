import React, { useReducer, useContext, createContext, Dispatch } from 'react';

export type PersonStringType = 'adult' | 'child' | 'baby';

export interface PersonState {
  adult: number;
  child: number;
  baby: number;
}

export type PersonAction =
  | { type: 'PLUS_ADULT' }
  | { type: 'MINUS_ADULT' }
  | { type: 'PLUS_CHILD' }
  | { type: 'MINUS_CHILD' }
  | { type: 'PLUS_BABY' }
  | { type: 'MINUS_BABY' };

type PersonDispatch = Dispatch<PersonAction>;

const initPersonState: PersonState = {
  adult: 0,
  child: 0,
  baby: 0,
};

const PersonStateContext = createContext<PersonState | null>(null);
const PersonDispatchContext = createContext<PersonDispatch | null>(null);

function reducer(state: PersonState, action: PersonAction): PersonState {
  switch (action.type) {
    case 'PLUS_ADULT':
      return {
        ...state,
        adult: state.adult + 1,
      };
    case 'MINUS_ADULT':
      return {
        ...state,
        adult: state.adult - 1,
      };
    case 'PLUS_CHILD':
      return {
        ...state,
        adult: state.adult === 0 ? 1 : state.adult,
        child: state.child + 1,
      };
    case 'MINUS_CHILD':
      return {
        ...state,
        child: state.child - 1,
      };
    case 'PLUS_BABY':
      return {
        ...state,
        adult: state.adult === 0 ? 1 : state.adult,
        baby: state.baby + 1,
      };
    case 'MINUS_BABY':
      return {
        ...state,
        baby: state.baby - 1,
      };
    default:
      throw new Error('Unexpected action');
  }
}

export function PersonProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initPersonState);

  return (
    <PersonStateContext.Provider value={state}>
      <PersonDispatchContext.Provider value={dispatch}>
        {children}
      </PersonDispatchContext.Provider>
    </PersonStateContext.Provider>
  );
}

export function usePersonState() {
  const state = useContext(PersonStateContext);
  if (!state) throw new Error('Cannot find PersonProvider');
  return state;
}

export function usePersonDispatch() {
  const dispatch = useContext(PersonDispatchContext);
  if (!dispatch) throw new Error('Cannot find PersonProvider');
  return dispatch;
}

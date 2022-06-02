import React, { useReducer, useContext, createContext, Dispatch } from 'react';

import { MenuType } from '@components/Header/MiniSearchBar/Menu';

export interface HeaderState {
  menuType: MenuType;
  isFocus: boolean;
}

type Action =
  | { type: 'TOGGLE_FOCUS'; menuType: MenuType }
  | { type: 'CHANGE_MENU_TYPE'; menuType: MenuType }
  | { type: 'BODY_CLICK' };

type HeaderDispatch = Dispatch<Action>;

const initHeaderState: HeaderState = {
  menuType: 'checkin',
  isFocus: true,
};

const HeaderStateContext = createContext<HeaderState | null>(null);
const HeaderDispatchContext = createContext<HeaderDispatch | null>(null);

function reducer(state: HeaderState, action: Action): HeaderState {
  switch (action.type) {
    case 'TOGGLE_FOCUS':
      return {
        menuType: action.menuType,
        isFocus: !state.isFocus,
      };
    case 'BODY_CLICK':
      return { ...initHeaderState };
    case 'CHANGE_MENU_TYPE':
      return {
        ...state,
        menuType: action.menuType,
      };
    default:
      throw new Error('Unhandled action');
  }
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initHeaderState);

  return (
    <HeaderStateContext.Provider value={state}>
      <HeaderDispatchContext.Provider value={dispatch}>
        {children}
      </HeaderDispatchContext.Provider>
    </HeaderStateContext.Provider>
  );
}

export function useHeaderState() {
  const state = useContext(HeaderStateContext);
  if (!state) throw new Error('Cannot find HeaderProvider');
  return state;
}

export function useHeaderDispatch() {
  const dispatch = useContext(HeaderDispatchContext);
  if (!dispatch) throw new Error('Cannot find HeaderProvider');
  return dispatch;
}

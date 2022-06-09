import { useEffect, useReducer } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

type Action<T> =
  | { type: 'LOADING' }
  | { type: 'FETCHED'; payload: T }
  | { type: 'ERROR'; payload: Error };

export default function useFetch<T>(
  url: string,
  options?: RequestInit,
): State<T> {
  const initState: State<T> = {
    data: undefined,
    error: undefined,
    isLoading: false,
  };

  function reducer(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
      case 'LOADING':
        return { ...state, isLoading: true };
      case 'FETCHED':
        return {
          ...state,
          isLoading: false,
          data: action.payload,
        };
      case 'ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        throw Error('Unexpected action on useFetch');
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const payload = await response.json();
        dispatch({ type: 'FETCHED', payload });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error as Error });
      }
    };

    fetchData();
  }, []);

  return state;
}

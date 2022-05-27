import debounce from 'lodash/debounce';
import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState<number>(window.pageYOffset);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  const delay = 100;

  useEffect(() => {
    window.addEventListener('scroll', debounce(listener, delay));
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return {
    scrollY,
  };
}

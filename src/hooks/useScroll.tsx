import throttle from 'lodash/throttle';
import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState<number>(window.pageYOffset);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  const delay = 500;

  useEffect(() => {
    window.addEventListener('scroll', throttle(listener, delay));
    return () => window.removeEventListener('scroll', listener);
  }, []);

  return {
    scrollY,
  };
}

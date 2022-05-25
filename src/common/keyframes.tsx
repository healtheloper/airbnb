import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0)
  }
`;

export const fadeOut = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(-100%);
  }
`;

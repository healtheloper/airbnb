import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        body {
          color: white;
          background-color: black;
        }
      `}
    />
  );
}

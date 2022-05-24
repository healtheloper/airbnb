import { Global, css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';

import color from '@constants/color';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        ${emotionNormalize}
        body {
          color: ${color.grey1};
          background-color: ${color.bgColor};
        }
      `}
    />
  );
}

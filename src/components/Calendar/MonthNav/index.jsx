import styled from '@emotion/styled';
import { throttle } from 'lodash';
import { useEffect, useRef } from 'react';

import color from '@constants/color';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  :hover {
    background-color: ${color.grey4};
  }
`;

const TRANSITION_TIME = 200;
const DELAY_SPARE_TIME = 100;

export default function MonthNav({ onArrowClick }) {
  const leftBtn = useRef();
  const rightBtn = useRef();

  useEffect(() => {
    leftBtn.current.addEventListener(
      'click',
      throttle(() => {
        onArrowClick('left');
      }, TRANSITION_TIME + DELAY_SPARE_TIME),
    );
    rightBtn.current.addEventListener(
      'click',
      throttle(() => {
        onArrowClick('right');
      }, TRANSITION_TIME + DELAY_SPARE_TIME),
    );
  }, []);

  return (
    <Wrapper>
      <ArrowWrapper ref={leftBtn}>
        <LeftArrow />
      </ArrowWrapper>
      <ArrowWrapper ref={rightBtn}>
        <RightArrow />
      </ArrowWrapper>
    </Wrapper>
  );
}

import styled from '@emotion/styled';

import color from '@constants/color';
import useThrottle from '@hooks/useThrottle';

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

export default function MonthNav({ onArrowClick }) {
  const handleLeftClick = useThrottle(() => {
    onArrowClick('left');
  }, TRANSITION_TIME);
  const handleRightClick = useThrottle(() => {
    onArrowClick('right');
  }, TRANSITION_TIME);

  return (
    <Wrapper>
      <ArrowWrapper onClick={handleLeftClick}>
        <LeftArrow />
      </ArrowWrapper>
      <ArrowWrapper onClick={handleRightClick}>
        <RightArrow />
      </ArrowWrapper>
    </Wrapper>
  );
}

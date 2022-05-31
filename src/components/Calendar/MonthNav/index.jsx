import styled from '@emotion/styled';

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

export default function MonthNav({ onArrowClick }) {
  return (
    <Wrapper>
      <ArrowWrapper onClick={() => onArrowClick('left')}>
        <LeftArrow />
      </ArrowWrapper>
      <ArrowWrapper onClick={() => onArrowClick('right')}>
        <RightArrow />
      </ArrowWrapper>
    </Wrapper>
  );
}

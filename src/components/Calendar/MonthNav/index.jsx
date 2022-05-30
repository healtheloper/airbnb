import styled from '@emotion/styled';

import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const ArrowWrapper = styled.div``;

export default function MonthNav() {
  return (
    <Wrapper>
      <LeftArrow />
      <RightArrow />
    </Wrapper>
  );
}

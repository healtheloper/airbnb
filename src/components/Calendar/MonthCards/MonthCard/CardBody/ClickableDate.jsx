import styled from '@emotion/styled';

import color from '@constants/color';

const BodyElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${color.grey1};
  cursor: pointer;
  width: 100%;
  height: 100%;
  :hover {
    background-color: ${color.grey1};
    color: ${color.white};
  }
`;

export default function ClickableDate({ year, month, date }) {
  const handleClickDate = () => {
    console.log(year, month, date);
  };
  return (
    <BodyElement onClick={handleClickDate}>
      <span>{date}</span>
    </BodyElement>
  );
}

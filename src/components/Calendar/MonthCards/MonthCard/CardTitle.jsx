import styled from '@emotion/styled';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;

export default function CardTitle({ months }) {
  const year = months.getFullYear();
  const month = months.getMonth() + 1;
  return (
    <TitleWrapper>
      <h5>{`${year}년 ${month}월`}</h5>
    </TitleWrapper>
  );
}

import styled from '@emotion/styled';

import widths from '@constants/widths';

const CardWrapper = styled.div`
  width: ${widths.monthCard.percent}%;
  margin: 0 1%;
  display: grid;
  grid-template-rows: 1fr 3fr;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`;

const BodyWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
`;

const BodyElement = styled.li`
  display: flex;
  justify-content: center;
`;

function CardTitle({ today }) {
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  return (
    <TitleWrapper>
      <h5>{`${year}년 ${month}월`}</h5>
    </TitleWrapper>
  );
}

function CardBody({ today }) {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = today.getFullYear();
  const monthIdx = today.getMonth();
  const firstDay = new Date(year, monthIdx).getDay();
  const lastDate = new Date(year, monthIdx + 1, 0).getDate();
  const fillUntilFirstDay = new Array(firstDay).fill('');
  const monthDates = new Array(lastDate).fill(0).map((_, i) => i + 1);
  const bodyArray = [...days, ...fillUntilFirstDay, ...monthDates];

  return (
    <BodyWrapper>
      {bodyArray.map(bodyEl => (
        <BodyElement>
          <span>{bodyEl}</span>
        </BodyElement>
      ))}
    </BodyWrapper>
  );
}

export default function MonthCard() {
  const today = new Date();
  return (
    <CardWrapper>
      <CardTitle today={today} />
      <CardBody today={today} />
    </CardWrapper>
  );
}

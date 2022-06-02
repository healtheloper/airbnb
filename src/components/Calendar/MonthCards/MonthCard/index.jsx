import styled from '@emotion/styled';

import widths from '@constants/widths';

import CardBody from './CardBody';
import CardTitle from './CardTitle';

const CardWrapper = styled.div`
  width: ${widths.monthCard.percent}%;
  margin: 0 1%;
  display: grid;
  grid-template-rows: 1fr 5fr;
`;

export default function MonthCard({
  months,
  calendarDispatch,
  calendarState,
  onCardElClick,
}) {
  return (
    <CardWrapper>
      <CardTitle months={months} />
      <CardBody
        months={months}
        calendarDispatch={calendarDispatch}
        calendarState={calendarState}
        onCardElClick={onCardElClick}
      />
    </CardWrapper>
  );
}

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

export default function ClickableDate({
  year,
  month,
  date,
  calendarState: { checkin },
  calendarDispatch,
}) {
  const handleClickDate = () => {
    const myDate = new Date(year, month, date);
    /**
     * NEW CHECK IN
     * 1. CHECK IN 이 없는 경우
     * 2. CHECK IN 이 있지만 현재 CHECK IN 보다 앞 날짜를 고르는 경우
     */
    const newCheckInCondOne = checkin === '';
    console.log(checkin);
    const newCheckInCondTwo =
      checkin !== '' && checkin.getTime() > myDate.getTime();
    /**
     * CHECK OUT UPDATE
     * 1. CHECK IN 이 있고, 다음 선택되는 날짜가 CHECK IN 보다 뒤이거나 같은 경우
     */
    const checkOutUpdateCond =
      checkin !== '' && checkin.getTime() <= myDate.getTime();

    if (newCheckInCondOne || newCheckInCondTwo) {
      calendarDispatch({ type: 'NEW_CHECK_IN', checkin: myDate });
    } else if (checkOutUpdateCond) {
      calendarDispatch({ type: 'CHECK_OUT_UPDATE', checkout: myDate });
    }
  };
  return (
    <BodyElement onClick={handleClickDate}>
      <span>{date}</span>
    </BodyElement>
  );
}

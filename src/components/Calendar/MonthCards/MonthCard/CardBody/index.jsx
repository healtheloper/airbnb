import styled from '@emotion/styled';

import color from '@constants/color';

import ClickableDate from './ClickableDate';

const BodyWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 100%;
`;

const BodyElement = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayElement = styled.span`
  color: ${color.grey3};
`;

const UnclickableDate = styled.span`
  color: ${color.grey4};
`;

const totalBodyElementLength = 49; // 7 * 7

export default function CardBody({
  months,
  calendarState,
  calendarDispatch,
  onCardElClick,
}) {
  const { today, checkin, checkout } = calendarState;

  const isCheckInDate = (year, month, date) => {
    const myDate = new Date(year, month, date);
    return checkin !== '' && myDate.getTime() === checkin.getTime();
  };

  const isCheckOutDate = (year, month, date) => {
    const myDate = new Date(year, month, date);
    return checkout !== '' && myDate.getTime() === checkout.getTime();
  };

  const isDateBetweenInOut = (year, month, date) => {
    const myDate = new Date(year, month, date);
    return (
      checkout !== '' &&
      checkin !== '' &&
      myDate.getTime() >= checkin.getTime() &&
      myDate.getTime() <= checkout.getTime()
    );
  };

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = months.getFullYear();
  const monthIdx = months.getMonth();
  const firstDay = new Date(year, monthIdx).getDay();
  const lastDate = new Date(year, monthIdx + 1, 0).getDate();
  const fillUntilFirstDay = new Array(firstDay).fill('');
  const monthDates = new Array(lastDate).fill(0).map((_, i) => i + 1);
  const bodyArray = [...days, ...fillUntilFirstDay, ...monthDates];
  const polyfill = new Array(totalBodyElementLength - bodyArray.length).fill(
    '',
  );
  const filledBodyArray = [...bodyArray, ...polyfill];

  const getElementType = element => {
    const isFillElement = element === '';
    if (isFillElement) return 'FILL_STRING';

    const isDate = Number.isNaN(+element) === false;
    if (!isDate) return 'DAY';

    const SAME_YEAR_LOWER_MONTH =
      year === today.getFullYear() && monthIdx < today.getMonth();
    const SAME_YEAR_SAME_MONTH =
      year === today.getFullYear() && monthIdx === today.getMonth();
    const LOWER_YEAR = year < today.getFullYear();

    if (SAME_YEAR_SAME_MONTH) {
      return element < today.getDate() ? 'UNCLICKABLE_NUM' : 'CLICKABLE_NUM';
    }
    if (SAME_YEAR_LOWER_MONTH || LOWER_YEAR) {
      return 'UNCLICKABLE_NUM';
    }
    return 'CLICKABLE_NUM';
  };

  return (
    <BodyWrapper>
      {filledBodyArray.map(bodyEl => {
        switch (getElementType(bodyEl)) {
          case 'CLICKABLE_NUM':
            return (
              <ClickableDate
                year={year}
                month={monthIdx}
                date={bodyEl}
                isCheckInDate={isCheckInDate(year, monthIdx, bodyEl)}
                isCheckOutDate={isCheckOutDate(year, monthIdx, bodyEl)}
                isDateBetweenInOut={isDateBetweenInOut(year, monthIdx, bodyEl)}
                calendarDispatch={calendarDispatch}
                calendarState={calendarState}
                onCardElClick={onCardElClick}
              />
            );
          case 'UNCLICKABLE_NUM':
            return (
              <BodyElement>
                <UnclickableDate>{bodyEl}</UnclickableDate>
              </BodyElement>
            );
          case 'DAY':
            return (
              <BodyElement>
                <DayElement>{bodyEl}</DayElement>
              </BodyElement>
            );
          case 'FILL_STRING':
            return (
              <BodyElement>
                <span>{bodyEl}</span>
              </BodyElement>
            );
          default:
            return (
              <BodyElement>
                <span>error</span>
              </BodyElement>
            );
        }
      })}
    </BodyWrapper>
  );
}

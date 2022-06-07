import { List } from '@mui/material';

import Person from '@components/Persons/Person';
import { PersonState, usePersonState } from '@contexts/PersonProvider';

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
};

const MIN_PERSON_COUNT = 0;
const MIN_ADULT_WITH_CHILD_BABY = 1;
const MAX_PERSON_COUNT = 8;

const getBtnClickableInfo = (personState: PersonState) => {
  const sumChildBabyCount = Object.entries(personState).reduce(
    (sum, nextPerson) => {
      const [type, count] = nextPerson;
      return type === 'adult' ? sum : sum + count;
    },
    0,
  );

  const parsedPersonEntries = Object.entries(personState).map(person => {
    const [personType, personCount] = person;

    const add = personCount < MAX_PERSON_COUNT;
    if (personType !== 'adult') {
      const remove = personCount > MIN_PERSON_COUNT;
      return [personType, { remove, add }];
    }

    // 성인은 아이, 유아가 한명이라도 있으면 0명이 될 수 없음
    const remove =
      sumChildBabyCount > 0
        ? personCount > MIN_ADULT_WITH_CHILD_BABY
        : personCount > MIN_PERSON_COUNT;

    return [personType, { remove, add }];
  });

  return Object.fromEntries(parsedPersonEntries);
};

export default function Persons() {
  const personState = usePersonState();
  const persons: [string, number][] = Object.entries(personState);
  const btnClickableInfo = getBtnClickableInfo(personState);

  return (
    <List sx={listStyle}>
      {persons.map(person => (
        <Person
          key={person[0]}
          person={person}
          btnClickableInfo={btnClickableInfo}
        />
      ))}
    </List>
  );
}

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { PersonStringType, usePersonState } from '@contexts/PersonProvider';

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
};

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

type InfoType = {
  title: string;
  desc: string;
};

type PersonInfoType = {
  [key in PersonStringType]: InfoType;
};

const personInfo: PersonInfoType = {
  adult: {
    title: '성인',
    desc: '만 13세 이상',
  },
  child: {
    title: '어린이',
    desc: '만 2~12세',
  },
  baby: {
    title: '유아',
    desc: '만 2세 미만',
  },
};

const renderPersonItem = (person: [string, number]) => {
  const [personType, personCount] = person;
  const type = personType as PersonStringType;
  const { title, desc }: InfoType = personInfo[type];
  const isLastElement = personType === 'baby';

  return (
    <ListItem key={personType} sx={listItemStyle} divider={!isLastElement}>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="input2">{desc}</Typography>
      </Box>
      <FlexBox ai="center" sx={{ gap: '0.5rem' }}>
        <IconButton aria-label="한명 줄이기">
          <RemoveCircleOutline />
        </IconButton>
        <Typography variant="h5">{personCount}</Typography>
        <IconButton aria-label="한명 추가하기">
          <AddCircleOutline />
        </IconButton>
      </FlexBox>
    </ListItem>
  );
};

export default function Persons() {
  const personState = usePersonState();
  const persons: [string, number][] = Object.entries(personState);
  return (
    <List sx={listStyle}>
      {persons.map(person => renderPersonItem(person))}
    </List>
  );
}

import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Typography, ListItem, IconButton } from '@mui/material';

import FlexBox from '@components/FlexBox';
import {
  PersonAction,
  PersonStringType,
  usePersonDispatch,
} from '@contexts/PersonProvider';

type InfoType = {
  title: string;
  desc: string;
};

type PersonInfoType = {
  [key in PersonStringType]: InfoType;
};

type ButtonClickableType = {
  remove: boolean;
  add: boolean;
};

type PersonButtonType = {
  [key in PersonStringType]: ButtonClickableType;
};

type PersonActionType = {
  [key in PersonStringType]: PersonAction;
};

interface PersonProps {
  person: [string, number];
  btnClickableInfo: PersonButtonType;
}

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

const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const addActions: PersonActionType = {
  adult: { type: 'PLUS_ADULT' },
  child: { type: 'PLUS_CHILD' },
  baby: { type: 'PLUS_BABY' },
};

const removeActions: PersonActionType = {
  adult: { type: 'MINUS_ADULT' },
  child: { type: 'MINUS_CHILD' },
  baby: { type: 'MINUS_BABY' },
};

export default function Person({ person, btnClickableInfo }: PersonProps) {
  const personDispatch = usePersonDispatch();

  const [personType, personCount] = person;
  const type = personType as PersonStringType;
  const { title, desc }: InfoType = personInfo[type];
  const isLastElement = personType === 'baby';
  const isRemoveBtnDisabled = !btnClickableInfo[type].remove;
  const isAddBtnDisabled = !btnClickableInfo[type].add;

  const handlePersonAdd = () => {
    const action: PersonAction = addActions[type];
    personDispatch(action);
  };

  const handlePersonRemove = () => {
    const action: PersonAction = removeActions[type];
    personDispatch(action);
  };

  return (
    <ListItem key={personType} sx={listItemStyle} divider={!isLastElement}>
      <Box>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="input2">{desc}</Typography>
      </Box>
      <FlexBox ai="center" sx={{ gap: '0.5rem' }}>
        <IconButton
          aria-label="한명 줄이기"
          disabled={isRemoveBtnDisabled}
          onClick={handlePersonRemove}
        >
          <RemoveCircleOutline />
        </IconButton>
        <Typography variant="h5">{personCount}</Typography>
        <IconButton
          aria-label="한명 추가하기"
          disabled={isAddBtnDisabled}
          onClick={handlePersonAdd}
        >
          <AddCircleOutline />
        </IconButton>
      </FlexBox>
    </ListItem>
  );
}

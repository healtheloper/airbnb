import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';

import FlexBox from '@components/FlexBox';

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

export default function Persons() {
  return (
    <List sx={listStyle}>
      <ListItem sx={listItemStyle} divider>
        <Box>
          <Typography variant="h5">성인</Typography>
          <Typography variant="input2">만 13세 이상</Typography>
        </Box>
        <FlexBox ai="center" sx={{ gap: '0.5rem' }}>
          <IconButton aria-label="한명 줄이기">
            <RemoveCircleOutline />
          </IconButton>
          <Typography variant="h5">0</Typography>
          <IconButton aria-label="한명 추가하기">
            <AddCircleOutline />
          </IconButton>
        </FlexBox>
      </ListItem>
      <ListItem sx={listItemStyle} divider>
        <Box>
          <Typography variant="h5">어린이</Typography>
          <Typography variant="input2">만 2~12세</Typography>
        </Box>
        <FlexBox ai="center" sx={{ gap: '0.5rem' }}>
          <IconButton aria-label="한명 줄이기">
            <RemoveCircleOutline />
          </IconButton>
          <Typography variant="h5">0</Typography>
          <IconButton aria-label="한명 추가하기">
            <AddCircleOutline />
          </IconButton>
        </FlexBox>
      </ListItem>
      <ListItem sx={listItemStyle}>
        <Box>
          <Typography variant="h5">유아</Typography>
          <Typography variant="input2">만 2세 미만</Typography>
        </Box>
        <FlexBox ai="center" sx={{ gap: '0.5rem' }}>
          <IconButton aria-label="한명 줄이기">
            <RemoveCircleOutline />
          </IconButton>
          <Typography variant="h5">0</Typography>
          <IconButton aria-label="한명 추가하기">
            <AddCircleOutline />
          </IconButton>
        </FlexBox>
      </ListItem>
    </List>
  );
}

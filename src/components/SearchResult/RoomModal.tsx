import { Typography, Box, Divider, Button, Modal } from '@mui/material';
import moment from 'moment';

import { differenceDate } from '@common/util';
import FlexBox from '@components/FlexBox';
import color from '@constants/color';

interface RoomModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  roomDetailData: any;
  checkIn: string;
  checkOut: string;
  guest: number;
}

const modalStyle = {
  width: '25rem',
  height: '33.875rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '0.625rem',
  padding: '1.5rem',
};

export default function RoomModal({
  open,
  setOpen,
  checkIn,
  checkOut,
  guest,
  roomDetailData,
}: RoomModalProps) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <FlexBox sx={modalStyle} fd="column">
        <Box sx={{ marginBottom: '1.5rem' }}>
          <FlexBox jc="space-between">
            <FlexBox>
              <Typography sx={{ fontWeight: '700' }}>
                ₩{roomDetailData.dailyPrice.toLocaleString()}
              </Typography>
              &nbsp;/&nbsp;박
            </FlexBox>
            <Typography
              variant="input2"
              sx={{ textDecoration: 'underline', fontWeight: '700' }}
            >
              후기 {roomDetailData.reviewCount}개
            </Typography>
          </FlexBox>
        </Box>
        <FlexBox
          sx={{
            width: '22rem',
            height: '6.68rem',
            marginBottom: '1rem',
            border: 1,
            borderColor: color.grey4,
            borderRadius: '0.625rem',
          }}
          fd="column"
        >
          <FlexBox
            sx={{
              height: '50%',
              borderBottom: 1,
              borderColor: color.grey4,
            }}
            ai="center"
          >
            <FlexBox
              sx={{
                width: '50%',
                height: '100%',
                padding: '0 1rem',
                borderRight: 1,
                borderColor: color.grey4,
              }}
              fd="column"
              jc="center"
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
                체크인
              </Typography>
              <Typography variant="input2">
                {moment(checkIn).format('YYYY. M. D.')}
              </Typography>
            </FlexBox>
            <FlexBox
              sx={{ width: '50%', height: '100%', padding: '0 1rem' }}
              fd="column"
              jc="center"
            >
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
                체크아웃
              </Typography>
              <Typography variant="input2">
                {moment(checkOut).format('YYYY. M. D.')}
              </Typography>
            </FlexBox>
          </FlexBox>
          <FlexBox
            sx={{ height: '50%', padding: '0 1rem' }}
            fd="column"
            jc="center"
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700 }}>
              인원
            </Typography>
            <Typography variant="input2">게스트 {guest}명</Typography>
          </FlexBox>
        </FlexBox>
        <Button
          sx={{
            width: '22rem',
            height: '3.43rem',
            borderRadius: '0.625rem',
            marginBottom: '1rem',
            color: color.white,
            backgroundColor: color.black,
            '&:hover': {
              backgroundColor: color.grey3,
            },
          }}
        >
          예약하기
        </Button>
        <Typography
          variant="input2"
          sx={{ textAlign: 'center', marginBottom: '1.68rem' }}
        >
          예약 확정 전에는 요금이 청구되지 않습니다.
        </Typography>
        <Box sx={{ marginBottom: '1rem' }}>
          <FlexBox jc="space-between" sx={{ marginBottom: '0.5rem' }}>
            <Typography sx={{ textDecoration: 'underline' }}>
              ₩{roomDetailData.dailyPrice.toLocaleString()} x{' '}
              {differenceDate(checkIn, checkOut)}박
            </Typography>
            <Typography>
              ₩
              {(
                roomDetailData.dailyPrice * differenceDate(checkIn, checkOut)
              ).toLocaleString()}
            </Typography>
          </FlexBox>
          <FlexBox jc="space-between" sx={{ marginBottom: '0.5rem' }}>
            <Typography sx={{ textDecoration: 'underline' }}>
              주 단위 요금 할인
            </Typography>
            <Typography>₩0</Typography>
          </FlexBox>
          <FlexBox jc="space-between" sx={{ marginBottom: '0.5rem' }}>
            <Typography sx={{ textDecoration: 'underline' }}>청소비</Typography>
            <Typography>₩0</Typography>
          </FlexBox>
          <FlexBox jc="space-between" sx={{ marginBottom: '0.5rem' }}>
            <Typography sx={{ textDecoration: 'underline' }}>
              서비스 수수료
            </Typography>
            <Typography>₩0</Typography>
          </FlexBox>
          <FlexBox jc="space-between" sx={{ marginBottom: '0.5rem' }}>
            <Typography sx={{ textDecoration: 'underline' }}>
              숙박세와 수수료
            </Typography>
            <Typography>₩0</Typography>
          </FlexBox>
        </Box>
        <Divider orientation="horizontal" sx={{ marginBottom: '1rem' }} />
        <FlexBox jc="space-between">
          <Typography sx={{ textDecoration: 'underline', fontWeight: 700 }}>
            총 합계
          </Typography>
          <Typography>가격</Typography>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
}

import { Divider, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import Copyright from '@components/Footer/Copyright';

const footerNav = [
  '개인정보처리방침',
  '이용약관',
  '한국의 변경된 환불 정책',
  '회사 세부정보',
];

export default function FooterBottom() {
  return (
    <FlexBox component="ul" sx={{ gap: 3, mt: 4 }}>
      <Copyright />
      {footerNav.map(nav => (
        <FlexBox key={nav} sx={{ gap: '1rem' }}>
          <Divider orientation="vertical" flexItem />
          <li>
            <Typography>{nav}</Typography>
          </li>
        </FlexBox>
      ))}
    </FlexBox>
  );
}

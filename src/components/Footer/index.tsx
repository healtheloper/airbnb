import { Typography, Box, Container, Divider, Grid } from '@mui/material';

import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import footerData from '@mocks/footer';

const footerNav = [
  '개인정보처리방침',
  '이용약관',
  '한국의 변경된 환불 정책',
  '회사 세부정보',
];
const { data } = footerData;

function Copyright() {
  return (
    <li key="copyright-1">
      <Typography variant="body2">
        {`© ${new Date().getFullYear()} Logo, Inc`}
      </Typography>
    </li>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: color.grey6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container columnSpacing={2}>
          {data.map(item => (
            <Grid item xs={3}>
              <Typography
                component="h6"
                variant="footer1"
                sx={{ fontWeight: 900 }}
              >
                {item.mainTitle}
              </Typography>
              {item.subs.map(subItem => (
                <Typography component="p" variant="footer1" sx={{ mt: 2 }}>
                  <span>{subItem.title}</span>
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>
        <FlexBox component="ul" sx={{ gap: 3, mt: 4 }}>
          <Copyright />
          {footerNav.map(nav => (
            <>
              <Divider orientation="vertical" flexItem />
              <li key={nav}>
                <Typography>{nav}</Typography>
              </li>
            </>
          ))}
        </FlexBox>
      </Container>
    </Box>
  );
}

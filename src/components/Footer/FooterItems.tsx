import { Grid, Typography } from '@mui/material';

import footerData from '@mocks/footer';

const { data } = footerData;

export default function FooterItems() {
  return (
    <Grid container columnSpacing={2}>
      {data.map(item => (
        <Grid key={item.mainTitle} item xs={3}>
          <Typography component="h6" variant="footer1" sx={{ fontWeight: 900 }}>
            {item.mainTitle}
          </Typography>
          {item.subs.map(subItem => (
            <Typography
              key={subItem.title}
              component="p"
              variant="footer1"
              sx={{ mt: 2 }}
            >
              <span>{subItem.title}</span>
            </Typography>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

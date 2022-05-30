import { Grid, Typography } from '@mui/material';

import footerData from '@mocks/footer';

const { data: footerItems } = footerData;

export default function FooterItems() {
  return (
    <Grid container columnSpacing={2}>
      {footerItems.map(({ mainTitle, subTitles }) => (
        <Grid key={mainTitle} item xs={3}>
          <Typography component="h6" variant="footer1" sx={{ fontWeight: 900 }}>
            {mainTitle}
          </Typography>
          {subTitles.map(subItem => (
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

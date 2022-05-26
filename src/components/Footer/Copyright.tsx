import { Typography } from '@mui/material';

export default function Copyright() {
  return (
    <li key="copyright-1">
      <Typography variant="body2">
        {`© ${new Date().getFullYear()} Logo, Inc`}
      </Typography>
    </li>
  );
}

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Fab } from '@mui/material';

export default function UserInfo() {
  return (
    <Fab variant="extended">
      <MenuIcon />
      <PersonIcon />
    </Fab>
  );
}

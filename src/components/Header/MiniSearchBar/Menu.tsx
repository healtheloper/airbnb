import { Typography } from '@mui/material';

export interface IMenu {
  title: string;
}

interface Props {
  menu: IMenu;
}

export default function Menu({ menu: { title } }: Props) {
  return <Typography variant="input2">{title}</Typography>;
}

import { Link, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

import { fadeIn } from '@common/keyframes';
import color from '@constants/color';

const StyledBreadcrumb = styled(Link)({
  color: color.grey1,
  textDecorationColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    color: color.black,
    fontWeight: 700,
  },
});

export default function Category() {
  return (
    <Breadcrumbs
      separator=""
      aria-label="headerCategory"
      sx={{ animation: `${fadeIn} .3s ease` }}
    >
      <StyledBreadcrumb>숙소</StyledBreadcrumb>
      <StyledBreadcrumb>체험</StyledBreadcrumb>
      <StyledBreadcrumb>온라인 체험</StyledBreadcrumb>
    </Breadcrumbs>
  );
}

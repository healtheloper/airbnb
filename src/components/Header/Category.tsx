import { Link, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

import color from '@constants/color';

const StyledBreadcrumb = styled(Link)({
  color: color.grey1,
  textDecorationColor: color.white,
  cursor: 'pointer',
  '&:hover': {
    color: color.black,
    fontWeight: 700,
  },
});

export default function Category() {
  return (
    <Breadcrumbs separator="" aria-label="headerCategory">
      <StyledBreadcrumb>숙소</StyledBreadcrumb>
      <StyledBreadcrumb>체험</StyledBreadcrumb>
      <StyledBreadcrumb>온라인 체험</StyledBreadcrumb>
    </Breadcrumbs>
  );
}

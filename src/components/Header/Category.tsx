import { Link, Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

import color from '@constants/color';
import { useHeaderState } from '@contexts/HeaderProvider';

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
  const { isFocus } = useHeaderState();
  return (
    <Breadcrumbs
      separator=""
      aria-label="headerCategory"
      sx={{
        transform: 'translateY(-4rem)',
        transition: 'all 0.25s ease',
        ...(isFocus && {
          transform: 'translateY(0rem)',
        }),
      }}
    >
      <StyledBreadcrumb>숙소</StyledBreadcrumb>
      <StyledBreadcrumb>체험</StyledBreadcrumb>
      <StyledBreadcrumb>온라인 체험</StyledBreadcrumb>
    </Breadcrumbs>
  );
}

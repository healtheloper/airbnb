import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Title = styled.span`
  font-size: 2rem;
  font-weight: 900;
  cursor: pointer;
`;
export default function Logo() {
  const navigate = useNavigate();
  return (
    <Title
      onClick={() => {
        navigate('/');
      }}
    >
      Logo
    </Title>
  );
}

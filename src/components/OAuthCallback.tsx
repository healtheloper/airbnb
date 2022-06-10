import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@components/Loading';
import { useHeaderDispatch } from '@contexts/HeaderProvider';
import useFetch, { ResponseState } from '@hooks/useFetch';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const headerDispatch = useHeaderDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const fetchUrl = `https://github-oauth-park.herokuapp.com/api/githubLogin?code=${code}`;
  const { isLoading, data }: ResponseState<{ avatarUrl: string }> =
    useFetch(fetchUrl);

  useEffect(() => {
    if (!isLoading && data) {
      headerDispatch({ type: 'LOGIN' });
      localStorage.setItem('avatarUrl', data.avatarUrl);
      navigate('/');
    }
  }, [data]);

  return <Loading />;
}

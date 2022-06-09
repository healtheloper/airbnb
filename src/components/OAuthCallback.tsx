import Loading from '@components/Loading';
import useFetch from '@hooks/useFetch';

export default function OAuthCallback() {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const body = JSON.stringify({
    code,
    clientId,
    clientSecret,
  });
  const fetchOptions = {
    method: 'POST',
    body,
  };
  const { data } = useFetch(`/api/githubLogin`, fetchOptions);
  console.log(data);

  return <Loading />;
}

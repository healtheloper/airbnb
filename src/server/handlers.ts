import { rest } from 'msw';

import { delay, getParamsFormat } from '@common/util';
import categoryLocations from '@server/dummyData/categoryLocations';
import nearLocations from '@server/dummyData/nearLocations';
import roomList from '@server/dummyData/roomList';

const getRooms: Parameters<typeof rest.get>[1] = async (_, res, ctx) => {
  await delay(1000);
  return res(ctx.status(200), ctx.json(roomList));
};

const getNearLocations: Parameters<typeof rest.get>[1] = async (
  _,
  res,
  ctx,
) => {
  await delay(1000);
  return res(ctx.status(200), ctx.json(nearLocations));
};

const getCategoryLocations: Parameters<typeof rest.get>[1] = async (
  _,
  res,
  ctx,
) => {
  await delay(1000);
  return res(ctx.status(200), ctx.json(categoryLocations));
};

const postGithubLogin: Parameters<typeof rest.post>[1] = async (
  req,
  res,
  ctx,
) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const { body } = req;
  const { code, clientId, clientSecret } = JSON.parse(body as string);
  const config = {
    client_id: clientId,
    client_secret: clientSecret,
    code,
  };
  const params = getParamsFormat(config);
  const fetchUrl = `${baseUrl}${params}`;
  const fetchOptions = {
    method: 'POST',
  };
  const response = await fetch(fetchUrl, fetchOptions);
  console.log(response);
  return res(ctx.status(200), ctx.json({ data: response }));
};

export function handlers() {
  return [
    rest.get('/api/nearLocations', getNearLocations),
    rest.get('/api/categoryLocations', getCategoryLocations),
    rest.get('/api/rooms', getRooms),
    rest.post('/api/githubLogin', postGithubLogin),
  ];
}

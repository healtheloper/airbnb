import { rest } from 'msw';

import { delay } from '@common/util';
import nearLocations from '@server/dummyData/nearLocations';
import roomList from '@server/dummyData/roomList';

import categoryLocations from './dummyData/categoryLocations';

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
  res(ctx.status(200), ctx.json(categoryLocations));
};

export function handlers() {
  return [
    rest.get('/api/nearLocations', getNearLocations),
    rest.get('/api/categoryLocations', getCategoryLocations),
    rest.get('/api/rooms', getRooms),
  ];
}

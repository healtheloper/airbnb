import { rest } from 'msw';

const getMe: Parameters<typeof rest.get>[1] = (_, res, ctx) =>
  res(
    ctx.status(200),
    ctx.json({
      name: '박상진',
    }),
  );

export function handlers() {
  return [rest.get('/api/me', getMe)];
}

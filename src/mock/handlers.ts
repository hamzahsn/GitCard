import { rest } from 'msw'

export const handlers = [
  rest.get('https://localhost:8080/', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json('Aloha!'))
  })
]

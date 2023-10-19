'use strict'

import { Type } from '@sinclair/typebox'
import fp from 'fastify-plugin'

const schema = Type.Object({
  CACHE_HOST: Type.String(),
  CACHE_PORT: Type.Number(),
  PORT: Type.Number({
    default: 3000
  }),
  HOST: Type.String({
    default: '0.0.0.0'
  })
})

export default fp(async function (fastify) {
  await fastify.register(import('@fastify/env'), {
    schema,
    dotenv: true
  })
}, {
  name: 'config'
})

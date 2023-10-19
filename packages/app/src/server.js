'use strict'

import fp from 'fastify-plugin'
import fastifyPrintRoutes from 'fastify-print-routes'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default fp(async function (fastify) {
  await fastify.register(fastifyPrintRoutes)
  await fastify.register(import('@fastify/sensible'))

  await fastify.register(import('@fastify/autoload'), {
    dir: join(__dirname, 'plugins')
  })

  await fastify.register(import('@fastify/autoload'), {
    dir: join(__dirname, 'routes'),
    options: {
      prefix: '/api'
    }
  })
})

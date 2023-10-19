'use strict'

import fastify from 'fastify'

async function main () {
  const server = fastify({
    logger: false
  })

  await server.register(import('./server.js'))

  return server.listen({
    port: server.config.PORT,
    host: server.config.HOST
  })
}

main()
  .then((address) => console.log(`Server is listening on ${address}`))

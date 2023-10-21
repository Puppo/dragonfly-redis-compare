'use strict'

import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  await fastify.register(import('@fastify/redis'), {
    host: fastify.config.CACHE_HOST,
    port: fastify.config.CACHE_PORT
  })

  fastify.decorate('cache', fastify.redis)

  fastify.addHook('onClose', (instance) => {
    instance.redis.quit()
  })
}, {
  name: 'cache',
  dependencies: ['config']
})

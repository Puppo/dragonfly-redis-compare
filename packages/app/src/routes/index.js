'use strict'

export default async function (fastify) {
  fastify.delete('', function () {
    return fastify.cache.flushall()
  })
}

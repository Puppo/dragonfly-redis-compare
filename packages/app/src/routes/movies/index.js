'use strict'

import {Type} from "@sinclair/typebox"

const MovieIdSchema = Type.Integer({ minimum: 1 })

const MovieSchema = Type.Object({
  id: MovieIdSchema,
  title: Type.String(),
  year: Type.Integer(),
  rating: Type.Integer(),
  actors: Type.Array(Type.String())
})

const Result = Type.Integer({ minimum: 0 })

export default async function movies (fastify) {
  fastify.post('', {
    schema: {
      body: MovieSchema,
      response: {
        200: MovieSchema
      }
    },
  }, async (request) => {
    await fastify.cache.set(`movies-${request.body.id}`, JSON.stringify(request.body))
    return request.body
  })

  fastify.put('', {
    schema: {
      response: {
        200: Result
      }
    }
  }, (request) => fastify.cache.flushall())

  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: MovieIdSchema
      }),
      response: {
        200: MovieSchema
      }
    }
  }, async (request) => {
    const movie = await fastify.cache.get(`movies-${request.params.id}`)
    if (!movie) {
      throw fastify.httpErrors.notFound()
    }
    return JSON.parse(movie)
  })

  fastify.put('/:id', {
    schema: {
      params: Type.Object({
        id: MovieIdSchema
      }),
      response: {
        200: Result
      }
    }
  }, (request) => fastify.cache.del(`movies-${request.params.id}`))
}

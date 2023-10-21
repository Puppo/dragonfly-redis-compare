'use strict'

import { Type } from '@sinclair/typebox'
import { Packr } from 'msgpackr'

const MovieIdSchema = Type.Integer({ minimum: 1 })

const CreateMovieSchema = Type.Object({
  title: Type.String(),
  year: Type.Integer(),
  rating: Type.Integer(),
  actors: Type.Array(Type.String())
})

const MovieSchema = Type.Intersect([
  Type.Object({
    id: MovieIdSchema
  }),
  CreateMovieSchema
])

function buildKey (id) {
  return `movies-${id}`
}

const packr = new Packr({
  maxSharedStructures: 8160,
  structures: []
})

const SERIALIZERS = {
  json: {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  },
  msgpack: {
    serialize: packr.pack.bind(packr),
    deserialize: packr.unpack.bind(packr)
  }
}

const getCacheMethods = (cache, serializeType) => {
  switch (serializeType) {
    case 'json':
      return {
        set: cache.set.bind(cache),
        get: cache.get.bind(cache)
      }
    case 'msgpack':
      return {
        set: cache.set.bind(cache),
        get: cache.getBuffer.bind(cache)
      }
    default:
      throw new Error(`Unknown serializer: ${serializeType}`)
  }
}

async function moviesRoute (fastify, { serializeType }) {
  const prefix = `/${serializeType}`
  const { serialize, deserialize } = SERIALIZERS[serializeType]
  const { set, get } = getCacheMethods(fastify.cache, serializeType)
  let id = 0
  fastify.post(`${prefix}`, {
    schema: {
      body: CreateMovieSchema,
      response: {
        201: MovieSchema
      }
    }
  }, function (request, response) {
    const newMovie = {
      id: ++id,
      ...request.body
    }
    return set(buildKey(newMovie.id), serialize(newMovie))
      .then(() => {
        response.code(201)
        return newMovie
      })
  })

  fastify.get(`${prefix}/:id`, {
    schema: {
      params: Type.Object({
        id: MovieIdSchema
      }),
      response: {
        200: MovieSchema
      }
    }
  }, function (request) {
    return get(buildKey(request.params.id))
      .then((movie) => {
        if (!movie) {
          throw fastify.httpErrors.notFound()
        }
        return deserialize(movie)
      })
  })
}

export default async function movies (fastify) {
  await fastify.register(moviesRoute, { serializeType: 'json' })
  await fastify.register(moviesRoute, { serializeType: 'msgpack' })
}

'use strict'

import { Type } from '@sinclair/typebox'

const StringIdSchema = Type.Integer({ minimum: 1 })

const StringSchema = Type.Object({
  id: StringIdSchema,
  value: Type.String()
})

function buildKey (id) {
  return `string-${id}`
}

export default async function string (fastify) {
  let id = 0
  fastify.post('', {
    schema: {
      body: Type.String(),
      response: {
        201: StringSchema
      }
    }
  }, function (request, response) {
    const newId = ++id
    return fastify.cache.set(buildKey(newId), request.body)
      .then(() => {
        response.code(201)
        return {
          id: newId,
          value: request.body
        }
      })
  })

  fastify.get('/:id', {
    schema: {
      params: Type.Object({
        id: StringIdSchema
      }),
      response: {
        200: StringSchema
      }
    }
  }, function (request) {
    const id = request.params.id
    return fastify.cache.get(buildKey(id))
      .then((value) => {
        if (!value) {
          throw fastify.httpErrors.notFound()
        }
        return {
          id,
          value
        }
      })
  })
}

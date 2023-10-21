'use strict'

import { request } from 'undici'

async function create (url, movie, { serializeType }) {
  const {
    statusCode,
    body
  } = await request(`${url}/api/movies/${serializeType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  })
  if (statusCode !== 201) {
    throw new Error(`Unexpected status code: ${statusCode}`)
  }
  return body.json()
}

export default {
  create
}

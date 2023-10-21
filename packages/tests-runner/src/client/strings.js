'use strict'

import { request } from 'undici'

async function create (url, value) {
  const {
    statusCode,
    body
  } = await request(`${url}/api/strings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
  })
  if (statusCode !== 201) {
    throw new Error(`Unexpected status code: ${statusCode}`)
  }
  return body.json()
}

export default {
  create
}

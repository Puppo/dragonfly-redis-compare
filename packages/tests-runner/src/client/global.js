'use strict'

import { request } from 'undici'

async function clear (url) {
  const {
    statusCode
  } = await request(`${url}/api`, {
    method: 'DELETE'
  })
  if (statusCode !== 200) {
    throw new Error(`Unexpected status code: ${statusCode}`)
  }
}

export default {
  clear
}

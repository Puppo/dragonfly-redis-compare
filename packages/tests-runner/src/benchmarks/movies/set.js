'use strict'

import autocannon from 'autocannon'
import globalClient from '../../client/global.js'
import { MOVIE } from './utils.js'

function teardown (url) {
  return globalClient.clear(url)
}

async function startBench (url, { serializeType }) {
  try {
    return await autocannon({
      url: `${url}/api/movies/${serializeType}`,
      connections: 100,
      duration: 10,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(MOVIE)
    })
  } finally {
    await teardown(url)
  }
}

export default startBench

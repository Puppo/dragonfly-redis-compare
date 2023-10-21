'use strict'

import autocannon from 'autocannon'
import globalClient from '../../client/global.js'
import movieClient from '../../client/movies.js'
import { MOVIE } from './utils.js'

async function setup (url, opts) {
  return await movieClient.create(url, MOVIE, opts)
}

async function teardown (url) {
  return globalClient.clear(url)
}

export default async function startBench (url, { serializeType }) {
  const { id } = await setup(url, { serializeType })
  try {
    const res = await autocannon({
      url: `${url}/api/movies/${serializeType}/${id}`,
      connections: 1000,
      duration: 10,
      method: 'GET'
    })

    console.log(
      autocannon.printResult(res, {
        renderResultsTable: true,
        renderLatencyTable: true
      })
    )
  } finally {
    await teardown(url)
  }
}

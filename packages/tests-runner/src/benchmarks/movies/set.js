'use strict'

import autocannon from 'autocannon'
import movieClient from '../../operations/movies/index.js'
import {MOVIE} from './utils.js'

function teardown(url) {
  return movieClient.delete(url, MOVIE.id)
}

async function startBench (url) {
  try {
    const res = await autocannon({
      url: `${url}/api/movies/`,
      connections: 1000,
      duration: 10,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(MOVIE),
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

export default startBench

'use strict'

import autocannon from 'autocannon'
import globalClient from '../../client/global.js'
import { HELLO } from './utils.js'

function teardown (url) {
  return globalClient.clear(url)
}

async function startBench (url) {
  try {
    const res = await autocannon({
      url: `${url}/api/strings`,
      connections: 1000,
      duration: 10,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(HELLO)
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

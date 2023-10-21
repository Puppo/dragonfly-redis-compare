'use strict'

import autocannon from 'autocannon'
import movieClient from '../../operations/movies/index.js'
import {MOVIE, MOVIE_ID} from './utils.js'

const id = 1
async function setup(url) {
  await movieClient.create(url, MOVIE)
}

async function teardown(url) {
  await movieClient.delete(url, MOVIE_ID)
}

export default async function startBench (url) {
  await setup(url)
  try {
    const res = await autocannon({
      url: `${url}/api/movies/${MOVIE_ID}`,
      connections: 1000,
      duration: 10,
      method: 'GET',
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


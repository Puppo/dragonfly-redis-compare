'use strict'

import autocannon from 'autocannon'
import globalClient from '../../client/global.js'
import stringClient from '../../client/strings.js'
import {HELLO} from './utils.js'

async function setup (url) {
  return await stringClient.create(url, HELLO)
}

async function teardown (url) {
  return globalClient.clear(url)
}

export default async function startBench (url) {
  const { id } = await setup(url)
  try {
    return await autocannon({
      url: `${url}/api/strings/${id}`,
      connections: 500,
      duration: 10,
      method: 'GET'
    })
  } finally {
    await teardown(url, id)
  }
}

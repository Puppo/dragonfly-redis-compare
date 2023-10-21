'use strict'

import {rawlist} from '@inquirer/prompts'
import autocannon from 'autocannon'
import compare from 'autocannon-compare'
import moviesBenchmarks from './benchmarks/movies/index.js'
import stringsBenchmarks from './benchmarks/strings/index.js'

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const URLS = {
  Redis: 'http://0.0.0.0:3000',
  DragonFly: 'http://0.0.0.0:3001'
}

const TESTS = {
  Strings: {
    Set: stringsBenchmarks.setStartBench,
    Get: stringsBenchmarks.getStartBench
  },
  Objects: {
    Set: moviesBenchmarks.setStartBench,
    Get: moviesBenchmarks.getStartBench
  }
}

function mapToChoices (obj) {
  return Object.keys(obj).map(key => ({
    name: key,
    value: key
  }))
}

async function main () {
  const TestCase = await rawlist({
    message: 'How do you want to benchmark?',
    choices: mapToChoices(TESTS)
  })
  const Test = TESTS[TestCase]
  const How = await rawlist({
    message: 'What do you want to benchmark?',
    choices: mapToChoices(Test)
  })
  let SerializeType = null
  if (TestCase === 'Objects') {
    SerializeType = await rawlist({
      message: 'Which serializer do you want to use?',
      choices: [
        { name: 'JSON', value: 'json' },
        { name: 'MessagePack', value: 'msgpack' }
      ]
    })
  }
  const runBenchmark = Test[How]
  let results = []
  for (const [name, url] of Object.entries(URLS)) {
    console.log(`Benchmarking ${name}...`)
    results.push(await runBenchmark(url, { serializeType: SerializeType }))
    console.log(autocannon.printResult(results.at(-1), {
      renderResultsTable: true,
      renderLatencyTable: true
    }))
    wait(3000)
  }
  console.log(compare(...results))
}

main()
  .catch(console.error)
  .finally(() => process.exit(0))

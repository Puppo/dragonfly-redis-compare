'use strict'

import {rawlist} from '@inquirer/prompts'
import moviesBenchmarks from './benchmarks/movies/index.js'

const URLS = {
  Redis: 'http://0.0.0.0:3000',
  DragonFly: 'http://0.0.0.0:3001'
}

const TESTS = {
  Movies: {
    Set: moviesBenchmarks.setStartBench,
    Get: moviesBenchmarks.getStartBench
  }
}

function mapToChoices(obj) {
  return Object.keys(obj).map(key => ({
    name: key,
    value: key
  }))
}

async function main() {
  const What = await rawlist({
    message: 'What do you want to test?',
    choices: mapToChoices(URLS)
  })
  const TestCase = await rawlist({
    message: 'In which way?',
    choices: mapToChoices(TESTS)
  })
  const Test = TESTS[TestCase]
  const How = await rawlist({
    message: 'How do you want to break it?',
    choices: mapToChoices(Test)
  })
  const url = URLS[What]
  const bench = Test[How]
  return bench(url)
}

main()
  .catch(console.error)
  .finally(() => process.exit(0))

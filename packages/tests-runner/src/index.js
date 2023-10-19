'use strict'

import inquirer from 'inquirer'
import {getStartBench, putStartBench} from './get.js'
import set from './set.js'

const URLS = {
  Redis: 'http://0.0.0.0:3000',
  DragonFly: 'http://0.0.0.0:3001'
}

const METHODS = {
  Set: set,
  Get: getStartBench,
  Put: putStartBench
}

inquirer.prompt([
  {
    type: 'list',
    name: 'What do you want to break?',
    choices: Object.keys(URLS)
  },
  {
    type: 'list',
    name: 'How do you want to break it?',
    choices: Object.keys(METHODS)
  }
])
  .then(answers => {
    const [What, How] = Object.values(answers)
    const url = URLS[What]
    const startBench = METHODS[How]
    startBench(url)
  })

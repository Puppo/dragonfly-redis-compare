'use strict'

import inquirer from 'inquirer'
import {delStartBench, getStartBench} from './get-and-del.js'
import setStartBench from './set.js'

const URLS = {
  Redis: 'http://0.0.0.0:3000',
  DragonFly: 'http://0.0.0.0:3001'
}

const METHODS = {
  Set: setStartBench,
  Get: getStartBench,
  Del: delStartBench
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

'use strict'

import autocannon from 'autocannon'


function generateBench(method) {
  return function startBench (url) {
  let id = 0
  const instance = autocannon({
    url: url + `/api/movies/${++id}`,
    connections: 1000,
    duration: 10,
    method,
  }, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(
      autocannon.printResult(res, {
        renderResultsTable: true,
        renderLatencyTable: true
      })
    )
  })

  instance.on('response', function (client) {
    client.setRequest({
      method: 'GET',
      path: url + `/api/movies/${++id}`
    })
  })
}
}

const getStartBench = generateBench('GET')
const delStartBench = generateBench('PUT')

export {
  delStartBench, getStartBench
}


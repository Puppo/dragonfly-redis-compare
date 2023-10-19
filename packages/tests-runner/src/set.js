'use strict'

import autocannon from 'autocannon'

function generateMovie (id) {
  return {
    id,
    title: 'Movie title',
    year: 2020,
    rating: 5,
    actors: ['Actor 1', 'Actor 2', 'Actor 3']
  }
}

function startBench (url) {
  let id = 0
  const instance = autocannon({
    url: url + '/api/movies',
    connections: 100,
    duration: 10,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(generateMovie(++id)),
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

  // modify the body on future requests
  instance.on('response', function (client) {
    client.setBody(JSON.stringify(generateMovie(++id)))
  })
}

export default startBench

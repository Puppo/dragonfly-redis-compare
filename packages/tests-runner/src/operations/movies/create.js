'use strict'

import {request} from 'undici';

export default async function createMovie(url, movie) {
  const {
    statusCode
  } = await request(`${url}/api/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  });
  return statusCode;
}
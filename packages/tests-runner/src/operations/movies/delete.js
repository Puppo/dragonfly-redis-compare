'use strict'

import {request} from 'undici';

export default async function deleteMovie(url, id) {
  const {
    statusCode
  } = await request(`${url}/api/movies/${id}`, {
    method: 'DELETE'
  });
  return statusCode;
}
'use strict'

export const MOVIE = {
  id: 1,
  title: 'Movie title',
  year: 2020,
  rating: 5,
  actors: ['Actor 1', 'Actor 2', 'Actor 3']
}

export const MOVIE_ID = MOVIE.id

export function buildMoviesUrl(url) {
  return url + '/api/movies'
}
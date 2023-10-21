'use strict'

import create from './create.js';
import deleteMovie from './delete.js';

export default {
  create,
  delete: deleteMovie,
};
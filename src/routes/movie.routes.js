const express = require('express');
const movieRouter = express.Router();
const {getMovies, getMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/movie.controller');

movieRouter.get('/', getMovies);
movieRouter.get('/:id', getMovie);
movieRouter.post('/', createMovie);
movieRouter.patch('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);

module.exports = movieRouter;
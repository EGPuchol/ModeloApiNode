const express = require('express');
const studioRouter = express.Router();
const {getStudios, getStudio, createStudio, updateStudio, deleteStudio, addMovie} = require('../controllers/studio.controller');

studioRouter.get('/', getStudios);
studioRouter.get('/:id', getStudio);
studioRouter.post('/', createStudio);
studioRouter.patch('/:id', updateStudio);
studioRouter.delete('/:id', deleteStudio);
studioRouter.post('/movie', addMovie);


module.exports = studioRouter;


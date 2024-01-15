const Studio = require("../models/studio.model");
const Movie = require("../models/movie.model");


//get all
const getStudios = async (request, response) => {
  try {
    const studios = await Studio.find().populate('movies');
    response.status(200).json(studios);
  } catch (error) {
    console.log(error.message);
    response.status(404).json({ message: "Studios not found" });
  }
};

// get 1
const getStudio = async (request, response) => {
  try {
    const id = request.params.id;
    const studio = await Studio.findById(id).populate('movies');;
    response.status(200).json(studio);
  } catch (error) {
    console.log(error.message);
    response.status(404).json({ message: `Studio ${id} not found` });
  }
};

// post
const createStudio = async (request, response) => {
  const studio = new Studio(request.body);
  try {
    await studio.save();
    response.status(201).json({ studio });
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: error });
  }
};

//patch
const updateStudio = async (request, response) => {
  try {
    const id = request.params.id;
    const body = request.params.body;
    const studio = await Studio.findByIdAndUpdate(id, body, { new: true });
    response.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    response.status(400).json({ message: `No se pudo actualizar` });
  }
};

// delete
const deleteStudio = async (request, response) => {
  try {
    const id = request.params.id;
    const studio = await Studio.findByIdAndDelete(id);
    response.status(200).json({ message: "Se borró la productora" });
  } catch (error) {
    console.log(error.message);
    response.status(404).json({ message: `Studio ${id} not found` });
  }
};

const addMovie = async (request, response, next) => {
  const { studio_id, movie_id } = request.body;

  if (!studio_id || !movie_id) {
    return response.status(404).json({
      status: 404,
      message: HTTPSTATUSCODE(404),
      data: request.body,
    });
  }
  try {
    const studio = await Studio.findById(studio_id);
    const movie = await Movie.findById(movie_id);
    if (studio && movie){
        studio.movies.push(movie_id);
        await studio.save();
        response.status(200).json({
          status:200,
          message: HTTPSTATUSCODE[200],
          data: studio
        })
      }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudios,
  getStudio,
  createStudio,
  updateStudio,
  deleteStudio,
  addMovie
};

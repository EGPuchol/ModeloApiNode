const mongoose = require ('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'una película debe tener título'],
        unique: true,
        trim: true,
        minlength: 2,
    },
    director: {
        type: String,
        required: [true, 'una película debe tener director'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'una película debe tener año'],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, 'una película debe tener género'],
        trim: true,
    },
    description: {
        type: String,
        // required: [true, 'una película debe tener descripción'],
        trim: true,
    },
    country: {
        type: String,
        // required: [true, 'una película debe tener país'],
        trim: true,
    },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
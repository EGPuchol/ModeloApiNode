const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "un estudio debe tener nombre"],
    unique: true,
    trim: true,
  },
  country: {
    type: String,
    required: [true, "un estudio debe tener país"],
    trim: true,
  },
  budget: {
    type: Number,
    required: [true, "un estudio debe tener presupuesto"],
    trim: true,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
  }],
});

const Studio = mongoose.model("Studio", studioSchema);

module.exports = Studio;

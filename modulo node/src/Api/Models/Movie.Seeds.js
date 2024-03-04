const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema(
        {
            title: { type: String },
            poster: { type: String },
            year: { type: Number },
            released: {type: Boolean},
        },
        {
            timestamps:true,
        }
    );

    const Movies = mongoose.model("Movies", MoviesSchema);

    module.exports = Movies;

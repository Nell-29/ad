const mongoose= require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        year:{type:Number, require:true},
        characters:[{type:mongoose.Schema.Types.ObjectId, ref:"Character"}],
        likes:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
        comments:[{type: mongoose.Schema.Types.ObjectId, ref:"Comment"}],
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie",MovieSchema);

module.exports = Movie;
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        post: { type: String, default: ""},
        imageUrl: { type: String},
        likes: { type: Number, default:0},
        firstName: { type: String},//Le prenom du publicateur
        usersLiked: { type:[String] , default: []},

    },
    { timestamps: true}
);

module.exports = mongoose.model('Post', postSchema)
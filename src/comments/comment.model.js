import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "El contenido del comentario es obligatorio"]
    },
    author: {
        type: String,
        required: [true, "El autor del comentario es obligatorio"]
    }
});

export default mongoose.model('Comment', CommentSchema);
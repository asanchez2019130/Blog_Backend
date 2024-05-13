import mongoose from "mongoose";
import Comment from "./../comments/comment.model.js"

const TaskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is requerid"]
    },
    description: {
        type: String,
        required: [true, "Description is requerid"]
    },
    taskType: {
        type: String,
        required: [true, "Description is requerid"]
    },
    img: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    state: {
        type: Boolean,
        enum: ["Taller", "Practica Supervisada", "Tecnologia"],
        default: true
    }
})

export default mongoose.model('Task', TaskSchema);
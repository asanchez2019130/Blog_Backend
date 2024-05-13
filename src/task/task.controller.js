import { response, request } from "express";
import Task from './../task/task.model.js'
import Comment from './../comments/comment.model.js'

export const getTask = async (req = request, res = response) => {
    const { limite, desde } = req.body;
    const query = { state: true }

    const [total, tasks] = await Promise.all([
        Task.countDocuments(query),
        Task.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate("comments")
    ])

    res.status(200).json({
        total,
        tasks
    })
}

export const createTask = async (req, res) => {
    const { title, description, img, taskType } = req.body;
    const task = new Task({ title, description, img, taskType });

    await task.save();

    res.status(200).json({
        task,
    });
};

export const createComment = async (req, res) => {
    try {
        const { taskId, content, author } = req.body;
        const comment = new Comment({ content, author });
        await comment.save();


        const task = await Task.findByIdAndUpdate(taskId, { $push: { comments: comment._id } }, { new: true });

        res.status(201).json({ comment, task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el comentario" });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.body;
    const { _id, ...resto } = req.body;

    await Task.findByIdAndUpdate(id, resto);


    res.status(200).json({
        msg: "Tarea actualizada exitosamente",

    });
};

export const deleteTask = async (req, res) => {
    const { id } = req.body;
    await Task.findByIdAndUpdate(id, { state: false });

    res.status(200).json({
        msg: "Tarea eliminada exitosamente",
    });
};
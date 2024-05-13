import { Router } from "express";
import { check } from "express-validator";
import {
    createComment,
    createTask,
    deleteTask,
    getTask,
    updateTask
} from './task.controller.js'

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", getTask)

router.post("/",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("description", "El titulo es obligatorio").not().isEmpty(),
        check("img", "El titulo es obligatorio").not().isEmpty(),
        check("taskType", "El titulo es obligatorio").not().isEmpty(),
    ], validarCampos, createTask)

router.post("/comment/", [
    check("taskId", "No es un ID valido").isMongoId(),
    validarCampos
],
    createComment)

router.put(
    "/",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    updateTask
)

router.delete(
    "/",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos
    ],
    deleteTask
)


export default router;
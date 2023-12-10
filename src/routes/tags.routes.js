const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController.js");

const tagsRoutes = Router();

const tagsController = new MovieTagsController();

tagsRoutes.get("/:user_id", tagsController.index);



module.exports = tagsRoutes;
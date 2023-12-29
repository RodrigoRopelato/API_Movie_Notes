const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController.js");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();

const tagsController = new MovieTagsController();

tagsRoutes.get("/",ensureAuthenticated, tagsController.index);



module.exports = tagsRoutes;
const {Router} = require("express");

const MovieNotesController = require("../controllers/MovieNotesController.js");

const movieRoutes = Router();

const movieNotesController = new MovieNotesController();

movieRoutes.post("/:user_id", movieNotesController.create);
movieRoutes.get("/:id", movieNotesController.show);
movieRoutes.get("/", movieNotesController.index);
movieRoutes.delete("/:id",movieNotesController.delete);





module.exports = movieRoutes;
const {Router} = require("express");

const MovieNotesController = require("../controllers/MovieNotesController.js");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieRoutes = Router();

movieRoutes.use(ensureAuthenticated);

const movieNotesController = new MovieNotesController();

movieRoutes.post("/", movieNotesController.create);
movieRoutes.get("/:id", movieNotesController.show);
movieRoutes.get("/", movieNotesController.index);
movieRoutes.delete("/:id",movieNotesController.delete);
movieRoutes.put("/:id",movieNotesController.update);






module.exports = movieRoutes;
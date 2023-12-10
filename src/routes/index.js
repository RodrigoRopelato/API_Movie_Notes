const {Router} = require("express");

const usersRoutes = require("./user.routes.js");
const movieRoutes = require("./movie.routes.js");
const tagsRoutes = require("./tags.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movie", movieRoutes);
routes.use("/tags", tagsRoutes);


module.exports = routes;
const express = require("express");
const pingRouter = require("./ping_router");



const v1Router = express.Router();


v1Router.use("/ping",  pingRouter)
module.exports = v1Router;
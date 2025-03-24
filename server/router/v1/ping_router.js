const express = require("express");


const pingRouter = express.Router();


pingRouter.get("/", (req, res) => {
    res.send({message:"ping Check success.."})
})

module.exports = pingRouter;
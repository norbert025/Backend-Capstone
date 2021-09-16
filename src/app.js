if (process.env.USER) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const moviesRouter = require("./movies/movies.router");
const theaterRouter = require("./theaters/theaters.router");
const reviewRouter = require("./review/review.router");


app.use(cors());
app.use(express.json());
app.use( "/movies", moviesRouter )
app.use("/theaters", theaterRouter);
app.use("/reviews", reviewRouter);


app.use(notFound);
app.use(errorHandler);

function notFound(req, res, next) {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

function errorHandler(error, request, response, next) {
  const { status = 500, message = "Something went wrong!" } = error;
  response.status(status).json({ error: message });
}

module.exports = app;

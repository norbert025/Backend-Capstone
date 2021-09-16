const router = require("express").Router( { mergeParams: true } );
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const theaterRouter = require("../theaters/theaters.router");
const reviewRouter = require("../review/review.router");

// root root
router
.route("/")
.get( controller.list )
.all( methodNotAllowed )

// /:movieId route
router
.route("/:movieId")
.get( controller.read )
.all( methodNotAllowed) ;


router
.use("/:movieId/reviews", controller.movieFound, reviewRouter);

router
.use("/:movieId/theaters", controller.movieFound, theaterRouter);


module.exports = router;

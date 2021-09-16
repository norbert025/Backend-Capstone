const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./review.controller");

// root route
router
.route("/")
.get( controller.list )
.all( methodNotAllowed );

// /:reviewId route
router
  .route("/:reviewId")
  .delete( controller.destroy )
  .put( controller.update )
  .all( methodNotAllowed );

module.exports = router;

const service = require("./review.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
  const { movie_id } = res.locals.movie;
  const data = await service.listMovie(movie_id);
  for (let i of data) {
    i.critic = await service.hasCritic(i.critic_id);
  }
  return res.json( { data: data } );
}

async function update(req, res, next) {
  const bodyData = req.body.data
  if (bodyData) {
    const review = { ...res.locals.review, ...req.body.data };
    const data = await service.update(review);
    data.critic = await service.hasCritic(review.critic_id);
    return res.json( { data } );
  }
   return next( { status: 400, message: "Missing update data" } );
}

async function reviewExists(req, res, next) {
  const  { reviewId } = req.params
  const data = await service.read(reviewId);
  if (data) {
    res.locals.review = data;
    return next();
  }
  return next( { status: 404, message: "Review cannot be found." } );
}

async function destroy(req, res) {
  const { review_id } = res.locals.review
  service.destroy(review_id)
  .then(() => res.sendStatus(204));
}


module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  
};

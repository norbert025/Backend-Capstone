const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");


async function list( req, res ) {
  const data = res.locals.movie
  if (data) {
    const { movie_id } = res.locals.movie;
    list = await service.listMovie(movie_id);
  } 

   return res.json({ data: await service.list() });
}

module.exports = {
  list:  asyncErrorBoundary(list)
};

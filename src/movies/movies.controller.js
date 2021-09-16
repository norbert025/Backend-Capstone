const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

// Read
async function read(req, res) {
  const movie = res.locals.movie
   return res.json({ data: movie });
}


// List
async function list(req, res) {
  let queryincluded = req.query.is_showing
  if (queryincluded) {
    listData = await service.nowShowing(queryincluded === "true");
  } 
  else {
    listData = await service.list();
  }
  return res.json( { data: listData }) ;
}


// MovieFound
async function movieFound(req, res, next) {
  const { movieId } = req.params
  const movie = await service.read(movieId);
  
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  
   return next( { status: 404, message: "Movie cannot be found." } );
}


module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieFound), asyncErrorBoundary(read)],
  movieFound: asyncErrorBoundary(movieFound),
};

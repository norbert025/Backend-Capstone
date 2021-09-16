const knex = require("../db/connection");

// listMovies
function listMovie(movie_id) {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id","movies_theaters.theater_id")
    .select("theaters.*", "movies_theaters.is_showing", "movies_theaters.movie_id")
    .where({ movie_id });
}

// withMovies
async function withMovies(theater) {
  // theater.movies
  theater.movies = await knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .where({ "movies_theaters.theater_id": theater.theater_id });
  return theater;
}

// List
function list() {
  return knex("theaters").then((data) => {
    return Promise.all(
      data.map((data) => {
        return withMovies(data);
      })
    );
  });
}




module.exports = { listMovie, list };


const knex = require("../db/connection");

// List
function list() {
  return knex("movies")
  .select();
}

// NowShowing
function nowShowing(is_showing) {
  return knex("movies")
    .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
    .select("movies.*", "movies_theaters.is_showing")
    .where({ is_showing })
    .groupBy("movies.movie_id")
}

// Read
function read(movie_id) {
  return knex("movies")
  .select()
  .where({ movie_id })
  .then((data) => data[0] )
}

module.exports = {
  read,
  list,
  nowShowing,
  
};

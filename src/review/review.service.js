const knex = require("../db/connection");

// Read
function read(review_id) {
  return knex("reviews")
  .select().where({ review_id })
  .then((data) => data[0])
}

// Update
async function update(review) {
  await knex("reviews")
    .select()
    .update(review, "*")
    .where({ review_id: review.review_id })
    

  return read(review.review_id);
}

// Destroy
function destroy(review_id) {
  return knex("reviews")
  .delete()
  .where({ review_id })
  
}

// List movie
function listMovie(movieId) {
  return knex("reviews")
  .select()
  .where({ "reviews.movie_id": movieId });
}

// hasCritic
function hasCritic(id) {
  return knex("critics")
  .select()
  .where({ "critics.critic_id": id })
  .then((data) => data[0])
}

module.exports = {
  read,
  update,
  destroy,
  hasCritic,
  listMovie,
};

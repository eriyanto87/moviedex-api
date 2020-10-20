const express = require("express");
const morgan = require("morgan");
const movies = require("./movies-data.json");

const app = express();
const PORT = 8000;

app.use(morgan("common"));

app.get("/movie", (req, res) => {
  const { genre, country, avg_vote } = req.query;

  let results;

  if (genre) {
    results = movies.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (country) {
    results = movies.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

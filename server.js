require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 8000;
const movies = require("./movies-data.json");

const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use(function validateBearerToken(req, res, next) {
  const bearerToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!bearerToken || bearerToken.split(" ")[1] !== apiToken) {
    res.status(401).json({ error: "Unauthorized Request" });
  }

  next();
});

app.get("/movie", (req, res) => {
  const { genre, country, avg_vote } = req.query;

  let results = movies;

  if (genre) {
    results = results.filter((movie) =>
      movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (country) {
    results = results.filter((movie) =>
      movie.country.toLowerCase().includes(country.toLowerCase())
    );
  }

  if (avg_vote) {
    results = results.filter((movie) => {
      return movie.avg_vote >= Number(avg_vote);
    });
  }

  res.json(results);
});

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { error };
  }
  res.status(500).json(response);
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

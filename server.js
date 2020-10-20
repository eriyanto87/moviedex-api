const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 8000;

app.use(morgan("common"));

app.use((req, res) => {
  res.send("hello from moviedex");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

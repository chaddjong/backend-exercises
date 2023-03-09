const express = require("express");
const app = express();
const users = require("./users.js");
const morgan = require("morgan");

app.use(morgan("combined"));

app.get("/users", (req, res, next) => {
  //   res.setHeader("Content-Type", "text/json");
  res.json(users);
});

app.get("/users/:name", (req, res) => {
  users.forEach((e) => {
    if (req.params.name.toLowerCase() === e.name.toLowerCase()) {
      res.json(e);
    }
  });
  res.json({
    message: "Data user tidak ditemukan",
  });
});

const notFound = (req, res, next) => {
  res.json({
    status: "error",
    message: "Resource tidak ditemukan",
  });
};
app.use(notFound);

const errorHandling = (err, req, res, next) => {
  res.json({
    status: "error",
    message: "terjadi kesalahan server",
  });
};
app.use(errorHandling);

const hostname = "localhost";
const port = 4000;
app.listen(port, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);

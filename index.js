const express = require("express");
const app = express();
const users = require("./users.js");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(morgan("combined"));
app.use(express.json());

app.set("view engine", "ejs");

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

app.post("/users", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  res.json({
    message: "Data berhasil dimasukkan",
    id: id,
    name: name,
  });
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image uploaded");
});

app.put("users/:name", (req, res) => {
  const name = req.body.name;
  res.send("ubah", name)
})

app.use(express.static(path.join(__dirname, "public")));

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

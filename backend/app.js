require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

//Morgan config
app.use(morgan("dev"));

//Config form data and JSON response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solve CORS
app.use(
  cors({
    credentials: true,
    origin: `http://localhost:${process.env.FRONT_END_PORT}`,
  })
);

//Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

require("./config/db.js");

const router = require("./routes/Router.js");

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});

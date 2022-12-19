// node packages
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// const { body, validationResult } = require('express-validator');
// const expressValidator = require('express-validator')

// envoke express server
const app = express();

app.use(cors());
// IMPORT ROUTERS FOR USING AS MIDDLEWARE
const productRoutes = require("./routes/product");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");

// db connact updated
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT;
    console.log("port number is ", port);

    app.listen(port || 8020, () => {
      console.log("servier is lisening on port", port);
    });
    console.log("db Connected");
  });

mongoose.connection.on("error", (err) => {
  console.log(`db error:${err} `);
});

// express middleware

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", productRoutes);
app.use("/", authRouter);
app.use("/", categoryRouter);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static("./build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.json({ error: "Unauthorized User" });
  }
});

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('./front/build'))

//     app.get('*', (req, res)=>{
//         res.sendFile(path.resolve(__dirname, 'front', 'build', 'index.html'))
//     })
// }

// making server

// https://stark-lake-28787.herokuapp.com/ | https://git.heroku.com/stark-lake-28787.git

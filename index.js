const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();
const TestModel = require("./models/test");

const PORT = 3000;

const mongoose = require("mongoose");

const dbUrl =
  "mongodb+srv://idoc_admin:idoc_pass@idoctest.mglvq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionParams = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose
  .connect(dbUrl, connectionParams)
  .then(() => {
    console.info("connected to the DB");
  })
  .catch((e) => {
    console.log("err:", e);
  });

app.listen(PORT, () => {
  console.log(` Listen at PORT : ${PORT}`);
});

app.get("/insert", (req, res) => {
  var testModel = new TestModel();
  testModel.name = "sreeName";
  testModel.type = "SreeType";

  testModel.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ msg: "Inserted to DB" });
    }
  });
});

const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();
const TestModel = require("./models/test");
const userRoute = require("./routes/user");
const healthRoute = require("./routes/health");
const responseRoute = require("./routes/response");
const tokenRoute = require("./routes/token");

const fetch = require("node-fetch");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use("/", userRoute);
app.use("/health", healthRoute);
app.use("/response", responseRoute);
app.use("/token", tokenRoute);
// app.use("/health", healthRoute);

// app.get("/insert", (req, res) => {
//   var testModel = new TestModel();
//   testModel.name = "sreeName";
//   testModel.type = "SreeType";

//   testModel.save((err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).send({ msg: "Inserted to DB" });
//     }
//   });
// });

app.get("/testone", async (req, res) => {
  try {
    const userDetails = await fetch(
      "https://sreejith97.github.io/sample-api/dataset.json"
    );
    let response = await userDetails.json();
    res.status(200).json({ sucess: true, details: response });
  } catch (err) {
    res.status(500).json({ sucess: false, err });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

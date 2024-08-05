const express = require('express');
const path = require("path");
const userModel = require("./public/src/connection");
const app = express();


app.set('view engine', "ejs")

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/allusers", async (req, res) => {
  const allusers = await userModel.find();
  res.render("user", { users: allusers });
})

app.post("/create", async function (req, res) {

  const { title, detail, image } = req.body;
  const data = new userModel({
    title,
    detail,
    image
  })
  await data.save();
  res.send(data);

})

app.get("/editeUsers", async function (req, res) {
  res.render("edit");
})

app.get("/deleteUsers/:id", async function (req, res) {
  let deleteuser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/allusers");
})

app.listen(3000, function () {
  console.log("lestening the server");
})
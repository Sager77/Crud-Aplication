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

app.post("/allusers", async function (req, res, next) {
  const { title, detail, image } = req.body;
  const data = new userModel({
    title,
    detail,
    image
  })
  console.log(data);
  await data.save();
  res.redirect('/allusers');

})

app.get("/editeUsers/:id", async function (req, res) {
 let user = await userModel.findOne({ _id: req.params.id });
  res.render('edit',{user});
})

app.post("/updateUser/:id", async function (req, res) {
  const { title, detail, image } = req.body;
  let user = await userModel.findOneAndUpdate({ _id: req.params.id }, {title, detail, image}, {new: true});
   res.redirect('/allusers');
 })

app.get("/deleteUsers/:id", async function (req, res) {
  let deleteuser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/allusers");
})

app.listen(3000, function (val) {
  console.log("lestening the server");
})
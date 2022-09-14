//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const date = require(__dirname + "/date.js")

const app = express();

const items = [];
const workItems = [];

// SETTING THE EJS //
app.set('view engine', 'ejs');

// SETTING THE APP TO RECEIVE DATA FROM FORM //
app.use(express.urlencoded());


// setting the express to recognize css local folder //

app.use(express.static("public"));

// SETTING THE PAGE THAT APPEARS WHEN USER ACCESS //
app.get("/", function(req, res) {

const day = date();

// SENDING THE INFO THAT WE WANT TO HTML VARIABLES //
  res.render("list", {
    listTitle: day,
    newListItems: items
  });
});

// GETTING USER INFORMATION FROM FORM POST ///
app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");

  } else {
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/work", function(req, res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
})

app.get("/about", function(req, res){
  res.render("about");
})

// SETTING UP SERVER //
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

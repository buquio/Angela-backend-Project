//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
// var item = ""; //EXAMPLE 5

/////EXAMPLE 1without ejs+ weekend.html & weekdat.html
// app.get("/", function(req, res) {

//   const today = newDate();
// var currentDay = today.getDay();
// if(currentDay ===6  || currentDay === 0){
//   res.sendFile(__dirname + "/weekend.html")
// }else{
//   res.sendFile(__dirname + "/weekday.html")

// } 
//   });

  ////////////EXAMPLE 2 using list.ejs/render
// app.get("/", function(req, res) {

//   const today = newDate();
// var currentDay = today.getDay();
//var day ="";

// if(currentDay ===6  || currentDay === 0){
//   day = "weekend";
// }else{
//   day = "weekday";

  // go into the list.ejs & paste the day-result from the IF in the {kindofday}
// res.render("list", {kindOfDay: day});

// } 
//   });

////////////EXAMPLE 3
// app.get("/", function(req, res) {

//   const today = newDate();
// var currentDay = today.getDay();
// var day ="";

// switch(currentDay) {
//   case 0:
//   day = "sunday";
//   break;
//   case 1:
//   day = "monday";
//   break;
//   case 2:
//   day = "tueday";
//   break;
//   case 3:
//   day = "wednesday";
//   break;
//   case 4:
//   day = "thursday";
//   break;
//   case 5:
//   day = "friday";
//   break;
//   case 6:
//   day = "saturday";
//   break;
//   default:
//     console.log("Error:current day is equal to + currentDay");
// }
// res.render("list", {kindOfDay: day});

// });

////////////EXAMPLE 4 coverting date to long e.g thursday july 2020
// app.get("/", function(req, res) {

//   var today = newDate();

// var options ={
//   weekday: "long",
//   day: "numeric",
//   month:"long"
// }
// var day = today.toLocaleDateString("en-us", options);

// res.render("list", {kindOfDay: day});

// });


/////////////EXAMPLE 5
app.post("/", function(req, res){

   item = req.body.newItem;

    res.redirect("/");
  
});



  ////////////using list.ejs/newlistitem/render
app.get("/", function(req, res) {

const day = date.getDate();
// const day = date.getDay();


  res.render("list", {listTitle: day, newListItems: items});

});

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


  ////////////using worklist.ejs/workitem/render
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

  ////////////using about.ejs/render
app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

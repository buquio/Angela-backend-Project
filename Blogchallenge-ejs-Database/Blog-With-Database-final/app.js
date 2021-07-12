//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//when you compose on /compose it store it on /post(where you see all the complete post) OR redirects to /home page IF Ds error
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//DATABASE
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", postSchema);


// GET ALL POST AND RENDER ON HOME-route
app.get("/", function(req, res){ //where do u want to get something from i.e /home

  Post.find({}, function(err, posts){
    res.render("home", {startingContent: homeStartingContent, posts: posts});
  });
});


//GET & RENDER ON ABOUT-route
//about & contact does not need to be stored in database,it only reders on the page
app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent}); //take the aboutContent & render it on "about" page thru /about
});


//GET &  RENDER CONTACT-route
app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


//GET & RENDER COMPOSE-route
app.get("/compose", function(req, res){ 
  res.render("compose");
});

// CREATE on COMPOSE-route & save to DATABASE 
app.post("/compose", function(req, res){ // displays a form
  const post = {  
    title: req.body.postTitle,
    content: req.body.postBody
  };
  post.save(function(err){ // save to database
    if (!err){
        res.redirect("/"); //if err redirect to home-route
    }
  });

//FIND ALL POST ---AS ABOVE
// app.get("/", function(req, res){ //where do u want to get something from i.e /home

//   Post.find({}, function(err, posts){
//     res.render("home", {
//       startingContent: homeStartingContent,
//       posts: posts
//       });
//   });
// });

    
//FIND  BY ID from the database
app.get("/posts/:postId", function(req, res){ //what do u want to get i.e /posts/:postId
const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {  //recieve post & place it in obj
      title: post.title,
      content: post.content
    });
  
  });

});


//FIND  BY postName/title from the database
app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  Post.findOne({title: requestedTitle}, function(err, post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];

app.get("/",function(req,res){
  res.render('home',{
    startingContent:homeStartingContent,
    posts:posts
  });
  /*let panjang= 100;
  let isi= posts.content;
  let truncated= isi.substring(0,panjang);*/
})
app.get("/about",function(req,res){
  res.render('about',{about:aboutContent})
})
app.get("/contact",function(req,res){
  res.render('contact',{contact:contactContent})
})
app.get("/compose",function(req,res){
  res.render('compose')
})
//untuk merender fitur compose 
app.post("/compose",function(req,res){
  const composer={
    title: req.body.title,
    content: req.body.post,
  };
  posts.push(composer);
  res.redirect("/")
})
//untuk membuat percabangan di post request
app.get("/posts/:postReq",function(req,res){
  const requestedTitle=_.lowerCase(req.params.postReq);
  
  posts.forEach(function(post){
    const storedTitle= _.lowerCase(posts.title);

    if (storedTitle===requestedTitle){
      res.render('post',{
        match2:post.title,
        match:post.content
      })
    };
  });
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

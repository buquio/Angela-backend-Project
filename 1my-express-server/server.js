
const express = require("express");
const app = express();

app.get("/", function(request, response){
    // console.log(request);
    response.send("<h1>hello, world!</h1>");
});

app.get("/contact", function(request, response){
    // console.log(request);
    response.send("<h1>contact me!</h1>");
});
//why is the console.log not working??????????

//cd into the particular project folder
//first do npm install
//run  node app.js  ---confirm server started on port 3000
//put this url on postman localhost:3000/   or  localhost:3000/contact
//select 'get' on postman 
//see your result in the postman browser e.g <h1>hello, world!</h1>  or  <h1>contact me!</h1>
/////OR you console log inthe terminal
//  NOTE:CONTRL C to close the server

app.listen(3000, function(){
    console.log("server started on port 3000");
});
//
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


app.listen(3000, function(){
    console.log("server started on port 3000");
});
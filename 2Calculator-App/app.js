const express = require("express");
// const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html"); //send html-static file to the browser

})

app.post("/", function(req, res){
var num1 = Number(req.body.num1);
var num2 = Number(req.body.num2);

var result = num1 + num2;

res.send("The result of the calculation is " + result);

//   res.send("Thanks for posting");  
});
//cd into the particular project folder
//first do npm install
//run  node app.js  
//open the /index.html  in live saver but change the port to 3000 instead of the 5500
//input the num1 and num2
//click calculate-button 
//see your result in the browser --"The result of the calculation is " + result"


// BMI CALCULATOR  http://localhost:3000/bmicalculator
app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmicalculator.html");

})

//cd into the particular project folder
//the calculate bmi-button will perform this function below
//first do npm install
// run  node app.js  
//open the /bmicalculator.html in live saver but change the port to 3000 instead of the 5500
//input the weight and height
//click calculate-button 
// see your result in the browser --"Your bmi is 9"
app.post("/bmicalculator", function(req, res){
    // console.log(req.body);
var weight = parseFloat(req.body.weight);
var height = parseFloat(req.body.height);

var bmi = weight/(height*height)
// var bmi = 76/(2*2)


res.send("Your bmi is " + bmi);

//   res.send("Thanks for posting");  
});


///???????how can i post on postman &see my result

app.listen(3000, function() {
    console.log("Server is running on port 3000");

});
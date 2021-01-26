const express = require("express");
const bodyParser = require("body-parser")
const request = require("request");
const https = require("http");


const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

//   console.log(firstName, lastName, email);

//to request must be in json format,
//check mailchipp docs for request body format i.e an array of object
//so do the below to convert it.
const data = {
    members[
        {
            email_address:email,
            status:"subscribed",
            merge_fields: {
             FNAME: firstName,
             LNAME: lastName    
            }
        }
    ]
};
const jsonData = JSON.stringify(data); 

const url = "https://us4.api.mailchimp.com....... "
const options = {
    method:"POST",
    auth:"angela1:d8d........"
}

const request = http.request(url,option, function(response)) 
 response.on("data", function(data){
     console.log(JSON.parse(data));
 })
});
request.write(jsonData);
request.end();

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});
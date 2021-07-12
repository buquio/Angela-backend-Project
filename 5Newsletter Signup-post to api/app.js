const express = require("express");
const bodyParser = require("body-parser")
// const request = require("request");
const https = require("http"); //posting to external API 


const app = express();

// https://www.youtube.com/watch?v=tZKYiiQP57I

// app.use(express.static("public"));  //use this when you connect to heroku
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res) { // Three things are happening here
//1.fName,lName,email from frontend will be stored in backend here inside const
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

//   console.log(firstName, lastName, email);
// })
//2.the stored data in backend need to be in mailchipp specified format
//check mailchipp docs for request body format i.e an array of object
//so request must be in json format,so do JSON.stringify(data) to convert it.
const data = {
    members:[
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


//3.now post the formatted request and send it to mailchimp.com
//first make a http post requet to mailchimp using the option format.
//also specify the response format
//get your url from malchipp :   url:"https://usX.api.mailchimp.com/3.0/lists/{list_id}"
// usX  : us1
// //get your api key from malchipp:  API key:  2dd94b792ad62dd56db44e317d52d9c0-us1
////get your list id from malchipp:   list_id : ac781394c9 


// const url = "https://usX.api.mailchimp.com/3.0/lists/{list_id}"
const url = "https://us1.api.mailchimp.com/3.0/lists/ac781394c9"//insert your url ,usx & list id from malchipp

const options = {
    method:"POST",
    // auth:"angela1:{API key}"
    auth:"angela1:2dd94b792ad62dd56db44e317d52d9c0-us1" //insert your api key from malchipp
}

const request = https.request(url, options, function(response) {
 if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");
 } else{
    res.sendFile(__dirname + "/failure.html");

 }
    response.on("data", function(data){
     console.log(JSON.parse(data));
 })
})
request.write(jsonData);//send data to mailchimp & specify type
request.end();
  

});


app.post("/failure", function(req, res){  //to change failure page back to home page after 2 secs
    res.redirect("/")
})


app.listen(3000, function() {
    console.log("Server is running on port 3000");

})


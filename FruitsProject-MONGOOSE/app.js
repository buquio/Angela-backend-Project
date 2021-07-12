const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruits2DB', {useNewUrlParser: true, useUnifiedTopology: true});

////
const fruitSchema = new mongoose.Schema ({
    name: String,
    score: Number,
    review: String
});

//BUILT-IN-VALIDATION WITHIN SCHEMA
// const fruitSchema = new mongoose.Schema ({
//     name: {type: String, required:[true,"pls check, no name entry!"]},
//     score: {type:Number, min:1, max:10},// it will throw an error msg
//     review: String
// });


//CREATE/POST/INSERT --NEW FRUIT
const Fruit = mongoose.model("Fruit", fruitSchema);//fruits collection
const fruit = new Fruit({ //fruit document/item
    name: "Apple",
    score: 37,//was 10 b4
    review: "Pretty solid as a friut."
});

fruit.save();
console.log('fruit')


//Create peach fruit without name + with/without validation
//without validation -it will show peach item without the name field
// with validation -peach item will not be added at all
// const fruit = new Fruit({
//     score: 10,
//     review: "Peaches are so yummy."
// });

// fruit.save();
// console.log('fruit')




//CREATE/POST/NEW/INSERT --PERSON 
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
});

const Person = mongoose.model("Person", personSchema);//person collection
const person = new Person({
    name: "John",
    age: 37,
});

// person.save();
console.log('person')


//////////CREATE MANY FRUIT =INSERTMANY
const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "Best friut."
});


const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Sour friut."
});


const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weird friut."
});


Fruit.insertMany([kiwi,orange,banana], function(err) { //insert & save
    if (err) {
        console.log(err);
        }else {
            console.log("Successfully saved all the fruits to fruitsDB")
        }   
});


/////// READ/FIND/GET ALL
Fruit.find(function(err, fruits) {// will render it as an array
    if(err) {
        console.log(err);
    }else {

     mongoose.connection.close();//you will not use contrl C+ node app.js anymore  
        // console.log(fruits);
    // loop thru the array and print out only fruit.name instead of console.log(fruits)
fruits.forEach(function(fruit){
    console.log(fruit.name);
});
    } 
});


//UPDATEONE by id
// update peach name 
Fruit.updateOne([_id:"5bc0854dd6ec7adjg55fds7", {name:"Peach"}, function(err) {
        if (err) {
            console.log(err);
            }else {
                console.log("Successfully update the peach docs")
            }   
    });


    // DELETE by name
    Fruit.deleteOne({name:"Peach"}, function(err) {
    if (err) {
        console.log(err);
        }else {
            console.log("Successfully deleted the peach docs")
        }   
});
// contrl C+run node app.js in terminal OR db.fruits.find() inside mongo shell



// DELETE MANY -delete all item with name:john 
Person.deleteMany({name:"John"}, function(err) {
    if (err) {
        console.log(err);
        }else {
            console.log("Successfully deleted the person.name.john")
        }   
});
//contrl C+ run node app.js in terminal OR db.people.find() inside mongo shell



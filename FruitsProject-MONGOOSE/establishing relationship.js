// Establing relationships between schemas/models/collections
//embeding fruits into person:john
// you cant add new field to person using updateOne
//you can only add a new field e.g favouritefruit: fruitSchema
//first update the personSchema
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruits2DB', {useNewUrlParser: true, useUnifiedTopology: true});


// BUILT-IN-VALIDATION WITHIN SCHEMA
const fruitSchema = new mongoose.Schema ({
    name: {type: String, required:[true,"pls check, no name entry!"]},
    score: {type:Number, min:1, max:10},// it will throw an error msg
    review: String
});


//CREATE/NEW 
const Fruit = mongoose.model("Fruit", fruitSchema);//fruits collection
const fruit = new Fruit({
// const apple = new Fruit({

    name: "Apple",
    score: 37,//was 10 b4
    review: "Pretty solid as a friut."
});

fruit.save();
// apple.save()
console.log('fruit')

///////////////////
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit:fruitSchema

});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
        name: "Pineapple",
        score: 9,
        review: "Delicious friut."
    });

    pineapple.save();

    const person = new Person({
        name: "Amy",
        age: 17,
        favouriteFruit:pineapple
        // favouriteFruit:apple 

    });
    
    // person.save();
    console.log('person')
// run node app.js in terminal OR db.people.find() inside mongo shell
// run db.fruit.find() inside mongo shell u will find same fruit id
//
    
    // TO UPDATE JOHN-SO IT WILL HAVE FAVORITE FRUIT 
    //first create new fruit mango
    //then update person.john
    const mango = new Fruit({
        name: "Mango",
        score: 6,
        review: "Sweet friut."
    });
    mango.save();

    Person.updateOne({name:"John"}, {favouriteFruit:"mango"}, function(err) {
        if (err) {
            console.log(err);
            }else {
                console.log("Successfully update the person.john")
            }   
    });
// run db.people.find() inside mongo shell u will find john has favouritefruit: mango

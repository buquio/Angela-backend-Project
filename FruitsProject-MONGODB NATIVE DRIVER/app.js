//XXXXXXXXX MONGODB NATIVE DRIVER VERSION 4.3 + Cluster in Atlas
// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db('sample_mflix');
//     const collection = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await collection.findOne(query);
//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


//////////////////////////////
// MONGODB NATIVE DRIVER VERSION 4.0
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection url 
const url = 'mongodb://localhost:27017';
// datbabe name 
const dbName = 'fruitsDB';

// create a new mongoclient 
const client = new MongoClient(url, { usedNewUrlParser: true });

//use connect method to connect to the server
   client.connect(function(err) {
    assert.equal(null, err);
    console.log("connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function(){
      client.close();
    });
   });

  // findDocuments(db, function(){
  //   client.close();
  // });
  //  });


// CREATE/INSERT 
   const insertDocuments = function(db, callback) {
     // get the documents collection
     const colllection = db.colllection('fruits');

     //insert some documents
     colllection.insertMany([
       {
        name: "Apple",
        score: 8,
        review: "Great friut."
       },
       {
        name: "Orange",
        score: 6,
        review: "Pretty friut."
       },
       {
        name: "Banana",
        score: 9,
        review: "Soft friut."
       }
     ],function(err, result){
    assert.equal(err, null);
    assert.equal(3, results.n);
    assert.equal(3, results.ops.lenght);
  console.log("inserted 3 documents into the collection");
callback(result);
     });
   }
   //run mongod on the terminal i.e mongodb server
  //then run mongo on another terminal i.e mongo shell 
  //then run node app.js on another terminal 



  //  READ/FIND/GET 
  const findDocuments = function(db, callback) {
    // get the documents collection
    const colllection = db.colllection('fruits');
    //find some documents
    colllection.find({}).toArray(function(err, fruits) {
   assert.equal(err, null);
 console.log("Found the following records");
 console.log(fruits);

callback(fruits);
    });
  }
//run mongod on the terminal i.e mongodb server
  //then run mongo on another terminal i.e mongo shell 
  //then run node app.js on another terminal 





  

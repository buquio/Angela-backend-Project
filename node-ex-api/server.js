// #1) Installations.
// #2) Create new Node.js Project with Express.js
// #3) Create and Run API endpoints.
// #4) CRUD Operations and HTTP methods.
// #5) Testing API with Postman.
// #6) Fix No ‘Access-Control-Allow-Origin’
const http = require('http');
const express = require('express');

const app = express();
app.use(express.json());

// default URL to API
app.use('/', function(req, res) {
    res.send('node-ex-api works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);

console.debug('Server listening on port ' + port);

// npm install
//npm start
// To test this API — Open your web browser and enter this URL → localhost:3000


// import required essentials
const express = require('express');
// create new router
const router = express.Router();

// create a JSON data array
let data = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
];

// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;

// npm install cors


// import required essentials
const http = require('http');
const express = require('express');
var cors = require('cors');
// import `items` from `routes` folder 
const itemsRouter = require('./routes/items');

// create new app
const app = express();
app.use(express.json());
// use it before all route definitions
// allowing below URL to access these APIs end-points
// you can replace this URL(http://localhost:8100) with your
// application URL from where you are calling these APIs
app.use(cors({origin: 'http://localhost:8100'}));

/* this '/items' URL will have two end-points:
→ localhost:3000/items/ (this returns array of objects)
→ localhost:3000/items/:id (this returns single object)
*/
app.use('/items', itemsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('node-ex-api works :-)');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);


/* Now, run npm start if your server is not running. This time we have three end-points:
→ localhost:3000 (Default)
→ localhost:3000/items (Returns all objects)
→ localhost:3000/items/1 (Returns single object of id=1)
 */
//Testing API  endpoints with Postman
//1 Enter GET request URL ( localhost:3000/items) or localhost:3000/items/1
//2 HTTP POST Request (to Add data)
-Before sending the POST request:
* Click “body” tab (1).
* Select “raw” from the radio box (2).
* Select JSON from the select box (3) — As we are sending JSON data.
* Add request data to the “body” of the request (4).
//3 PUT request: (EVERYTHING IS SAME AS “POST” REQUEST),just change post to put 
{
    "title": "Create a NEW project",
    "order": 1,
    "completed": false
}
// “You can check item you updated by sending a get request” 
//4 To send a DELETE request, change the request url to address a specific item id like this localhost:3000/items/3
→ And select DELETE as http verb.
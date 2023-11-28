// Import
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
const mysql = require("mysql");

// Express app object
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

//database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "reciapp",
  password: "asde",
  database: "myFlavour",
});
// connect database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connectd to database");
});
global.db = db;

// Set up css
app.use(express.static(__dirname + "/public"));
//Directory
app.set("views", __dirname + "/views");
//use EJS as the templating engine
app.set("view engine", "ejs");
// rendering engine
app.engine("html", ejs.renderFile);
// Define our data
var pageData = { pageTitle: "Flavour Harbour" };
// Include main.js in routes.
require("./routes/main")(app, pageData);

app.listen(port, () => console.log(`listening on port ${port}!`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const { init, dependantData } = require("./PopulateDB/init");
var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
//parse requests of content type - raw
app.use(bodyParser.raw());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const db = require("./app/models");

// Remove changes from the database
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  init();
});

//Save changes to the database
// db.sequelize.sync().then(() => {
//   // dependantData();
//   console.log("Resync Db");
// });;

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/menu.routes")(app);
require("./app/routes/coupon.routes")(app);
require("./app/routes/attendance.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/roomservice.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function to get test users

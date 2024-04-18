const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.room = require("../models/room.model.js")(sequelize, Sequelize);
db.menu = require("../models/menu.model.js")(sequelize, Sequelize);
db.coupon = require("../models/coupon.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model.js")(sequelize, Sequelize);
db.attendance = require("../models/attendance.model.js")(sequelize, Sequelize);
db.leave = require("../models/leave.model.js")(sequelize, Sequelize);

/**** Associations ****/
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.user.hasOne(db.coupon, {
  foreignKey: "userId",
});
db.coupon.belongsTo(db.user);
db.coupon.hasMany(db.ticket, {
  foreignKey: "couponCode",
});

db.ticket.belongsTo(db.coupon);

db.leave.belongsTo(db.user);
db.user.hasMany(db.leave, {
  foreignKey: "userId",
});

db.attendance.belongsTo(db.user);
db.user.hasMany(db.attendance, {
  foreignKey: "userId",
});
/**********************/

db.ROLES = ["user", "admin", "mess-admin", "clean-admin"];
db.MEALS = ["Breakfast", "Lunch", "Tea", "Dinner"];
db.LEAVETYPE = ["Casual", "Regular", "End of Semester", "Medical", "Others"];
module.exports = db;

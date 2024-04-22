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
db.notification = require("../models/notification.model.js")(
  sequelize,
  Sequelize
);
db.roomservice = require("../models/roomservice.model.js")(
  sequelize,
  Sequelize
);
db.room_user = require("../models/room_users.model.js")(sequelize, Sequelize);
/**** Associations ****/

//user-role relationship
db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

//room-user relationship
db.room.belongsToMany(db.user, {
  through: "room_user",
});
db.user.hasOne(db.room);

//coupon-user relationship
db.user.hasOne(db.coupon, {
  foreignKey: "userId",
});
db.coupon.belongsTo(db.user);

//coupon-ticket relationship
db.coupon.hasMany(db.ticket, {
  foreignKey: "couponCode",
});
db.ticket.belongsTo(db.coupon);

//leave-user relationship
db.leave.belongsTo(db.user);
db.user.hasMany(db.leave, {
  foreignKey: "userId",
});

//attendance-user relationship
db.attendance.belongsTo(db.user);
db.user.hasMany(db.attendance, {
  foreignKey: "userId",
});

//roomservice-user-room relationship
db.roomservice.belongsTo(db.user);
db.user.hasMany(db.roomservice, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.roomservice.belongsTo(db.room);
db.room.hasMany(db.roomservice, {
  foreignKey: "roomId",
  onDelete: "CASCADE",
});

/**********************/

db.ROLES = ["user", "admin", "mess-admin", "clean-admin"];
db.MEALS = ["Breakfast", "Lunch", "Tea", "Dinner"];
db.LEAVETYPE = ["Casual", "Regular", "End of Semester", "Medical", "Others"];
db.ROOMTYPE = ["Single-Non-Ac", "Double-Non-Ac", "Single-AC", "Double-AC"];
module.exports = db;

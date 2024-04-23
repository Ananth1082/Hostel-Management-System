const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const db = require("../app/models");
const Role = db.role;
const User = db.user;
const Room = db.room;
const Menu = db.menu;
const { userList } = require("./users");
const { roleList } = require("./roles");
const { roomList } = require("./room");
const { menuList } = require("./menu");
exports.init = async () => {
  // Initialize the app
  genrateRoles();
  console.log("Users are added");
  genrateUsers();
  console.log("Roles are added");
  generateRooms();
  console.log("Rooms are added");
  generateMenu();
};

function genrateUsers() {
  userList.forEach((user) => {
    User.create({
      id: user.usn,
      username: user.username,
      email: user.email,
      password: bcrypt.hashSync(user.password, 8),
    }).then((user) => {
      if (user) {
        if (user.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: user.roles,
              },
            },
          }).then((roles) => {
            user.setRoles(roles).then(() => {
              console.log("User roles are added");
            });
          });
        } else {
          user.setRoles([1]).then(() => {
            console.log("User roles are added");
          });
        }
      }
    });
  });
}
function genrateRoles() {
  roleList.forEach((role) => {
    Role.create({
      id: role.id,
      name: role.name,
    });
  });
}

function generateRooms() {
  roomList.forEach((room) => {
    Room.create({
      id: room.id,
      capacity: room.capacity,
      type: room.type,
      block: room.block,
    });
  });
}

function generateMenu() {
  menuList.forEach((menu) => {
    Menu.create(menu);
  });
}

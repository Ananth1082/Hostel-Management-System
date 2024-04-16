const controller = require("../controllers/room.controller");

module.exports = function (app) {
  app.get("/room", controller.getAllRooms);
  app.get("/room/:id", controller.getRoomByIDParams);
  app.post("/admin/createroom",controller.createRoom);
  app.get("/admin/deleteroom/:id",controller.deleteRoom)
  app.post("/admin/updateroom/:id",controller.updateRoom);
};

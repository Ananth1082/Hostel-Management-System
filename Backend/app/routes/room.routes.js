const controller = require("../controllers/room.controller");

module.exports = function (app) {
  app.get("/room", controller.getAllRooms);
  app.get("/room/:id", controller.getRoomByIDParams);
  app.post("/admin/room/createroom",controller.createRoom);
  app.post("/admin/room/addroommate",controller.addRoomMate);
  app.get("/admin/room/deleteroom/:id",controller.deleteRoom)
  app.post("/admin/room/updateroom/:id",controller.updateRoom);
};

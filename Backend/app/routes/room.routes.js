const controller = require("../controllers/room.controller");

module.exports = function (app) {
  app.get("/room", controller.getAllRooms);
  app.post("/room/roombyid", controller.getRoomByID);
  app.post("/admin/room/createroom",controller.createRoom);
  app.post("/admin/room/addroommate",controller.addRoomMate);
  app.post("/admin/room/deleteroom",controller.deleteRoom)
  app.post("/admin/room/updateroom",controller.updateRoom);
  app.post("/admin/room/deleteroommate",controller.removeRoomMate);
};

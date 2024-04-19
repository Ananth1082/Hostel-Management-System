const db = require("../models");

const roomservice = db.roomservice;

exports.getAllRoomServices = async (req, res) => {
  try {
    const query = req.body;
    const roomServices = await roomservice.findAll({where:query});
    res.status(201).json({
      message: "Room services retrieved successfully",
      roomServices,
    });
  } catch (error) {
    console.error("Error retrieving room services:", error);
    res.status(500).json({ error: "Failed to retrieve room services" });
  }
};
exports.createRoomService = async (req, res) => {
  try {
    const { roomId, userId, date } = req.body;
    const newRoomService = await roomservice.create({
      roomId: roomId,
      userId: userId,
      date: date,
    });
    res.status(201).json({ message: "Room service created successfully", newRoomService });
  } catch (error) {
    console.error("Error creating room service:", error);
    res.status(500).json({ error: "Failed to create room service" });
  }
};
exports.deleteRoomService = async (req, res) => {
  try {
    const { id } = req.params;
    const roomService = await roomservice.findByPk(id);
    if (!roomService) {
      return res.status(404).json({ error: "Room service not found" });
    }
    await roomService.destroy();
    res.json({ message: "Room service deleted successfully" });
  } catch (error) {
    console.error("Error deleting room service:", error);
    res.status(500).json({ error: "Failed to delete room service" });
  }
};
exports.updateRoomService = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomId, userId, date } = req.body;
    const roomService = await roomservice.findByPk(id);
    if (!roomService) {
      return res.status(404).json({ error: "Room service not found" });
    }
    roomService.roomId = roomId;
    roomService.userId = userId;
    roomService.date = date;
    await roomService.save();
    res.json({ message: "Room service updated successfully", roomService });
  } catch (error) {
    console.error("Error updating room service:", error);
    res.status(500).json({ error: "Failed to update room service" });
  }
};
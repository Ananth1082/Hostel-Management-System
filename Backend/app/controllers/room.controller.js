const { NUMBER } = require("sequelize");
const db = require("../models"); // Import the Room model
const Room = db.room;
const User = db.user;
const Room_User = db.room_user;
// Controller function to handle GET request for /room
exports.getAllRooms = async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.findAll();
    const roomList = await Promise.all(rooms.map(async (room) => {
      const inmates = await room.getUsers({attributes: ['id','username']});
      return { ...room.toJSON(),inmates };
    }));

    // Send the list of rooms as a JSON response
    res.status(200).json(roomList);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

exports.createRoom = async (req, res) => {
  try {
    // Extract room details from request body
    const { id, block, type, capacity } = req.body;

    // Check if roomNumber is already in use
    const existingRoom = await Room.findOne({ where: { id } });
    if (existingRoom) {
      return res.status(400).json({ error: "Room number already exists" });
    }

    // Create new room
    const newRoom = await Room.create({
      id: Number(id),
      block: block,
      type: type,
      capacity: Number(capacity),
    });
    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
};
exports.addRoomMate = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const room = await Room.findByPk(roomId);
    const user = await User.findByPk(userId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingRoomMate = await Room_User.findOne({
      where: { userId: userId },
    });
    if (existingRoomMate) {
      return res.status(400).json({ error: "User already asigned a room" });
    }
    const numberOfOccupants = await room.countUsers();
    if (numberOfOccupants == room.capacity) {
      return res.status(400).json({ error: "Room is full" });
    }
    await room.addUsers([user]);
    res.json({ message: "User added to room successfully" });
  } catch (error) {
    console.error("Error adding user to room:", error);
    res.status(500).json({ error: "Failed to add user to room" });
  }
};

exports.getRoomByID = async (req, res) => {
  try {
    // Extract room ID from request body
    const { id } = req.body;
    // Find the room by ID
    const room = await Room.findOne({ where: { id } });

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // If room is found, send it as a JSON response
    res.status(200).json({ message: "Room found successfully", room });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error retrieving room by ID:", error);
    res.status(500).json({ error: "Failed to retrieve room" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const { id } = req.body;

    // Find the room by ID
    const room = await Room.findByPk(id);

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Delete the room
    await room.destroy();

    // Send success response
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Failed to delete room" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const { id,capacity,type,block } = req.body;

    // Find the room by ID
    let room = await Room.update({capacity:capacity,type:type,block:block},{where:{id:id}})

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    // Send success response
    res.json({ message: "Room updated successfully", room });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Failed to update room" });
  }
};
exports.removeRoomMate = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const room = await Room.findByPk(roomId);
    const user = await User.findByPk(userId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const existingRoomMate = await Room_User.findOne({
      where: { userId: userId },
    });
    if (!existingRoomMate) {
      return res.status(400).json({ error: "User not asigned a room" });
    }
    await room.removeUser(user);
    res.json({ message: "User removed from room successfully" });
  } catch (error) {
    console.error("Error removing user from room:", error);
    res.status(500).json({ error: "Failed to remove user from room" });
  }
}

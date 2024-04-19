const db = require("../models"); // Import the Room model
const Room = db.room;
const User = db.user;
const Room_User = db.room_user;
// Controller function to handle GET request for /room
exports.getAllRooms = async (req, res) => {
  try {
    // Fetch all rooms from the database
    const rooms = await Room.findAll();

    // Send the list of rooms as a JSON response
    res.json(rooms);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
};

exports.createRoom = async (req, res) => {
  try {
    // Extract room details from request body
    const { id, block, type, occupants1, occupants2 } = req.body;

    // Check if roomNumber is already in use
    const existingRoom = await Room.findOne({ where: { id } });
    if (existingRoom) {
      return res.status(400).json({ error: "Room number already exists" });
    }
    const inmate1 = await User.findOne({ where: { id: occupants1 } });
    const inmate2 = await User.findOne({ where: { id: occupants2 } });
    // Create new room
    const newRoom = await Room.create({
      id: id,
      block: block,
      type: type,
    });
    inmate1.setRoom(newRoom);
    inmate2.setRoom(newRoom);
    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Failed to create room" });
  }
};

exports.getRoomByIDParams = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const { id } = req.params;

    // Find the room by ID
    const room = await Room.findByPk(id);

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // If room is found, send it as a JSON response
    res.json(room);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error retrieving room by ID:", error);
    res.status(500).json({ error: "Failed to retrieve room" });
  }
};

exports.getRoomByID = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const { id } = req.body.id;

    // Find the room by ID
    const room = await Room.findByPk(id);

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // If room is found, send it as a JSON response
    res.json(room);
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error retrieving room by ID:", error);
    res.status(500).json({ error: "Failed to retrieve room" });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const { id } = req.params;

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
    const { id } = req.params;

    // Find the room by ID
    let room = await Room.findByPk(id);
    let room_user = await Room_User.findAll({ where: { room_id: id } });

    // If room is not found, send a 404 status code with an error message
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Extract updated room details from request body
    const { type, occupants1, occupants2 } = req.body;

    // Update room details
    if (type) room.type = type;
    if (occupants1) room_user[0].userId = occupants1;
    if (occupants2) room_user[1].userId = occupants2;
    // Update other properties as needed

    // Save the updated room
    await room.save();
    await room_user[0].save();
    await room_user[1].save();

    // Send success response
    res.json({ message: "Room updated successfully", room });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error updating room:", error);
    res.status(500).json({ error: "Failed to update room" });
  }
};

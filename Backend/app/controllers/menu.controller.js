const { where } = require("sequelize");
const db = require("../models"); // Import the Room model
const Menu = db.menu;

exports.getAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();

    res.json(menus);
  } catch (error) {
    console.error("Error fetching menu details: ", error);
    res.status(500).json({ error: "Failed to fetch menus details " });
  }
};

exports.getMenuByDayTime = async (req, res) => {
  try {
    const info = req.body;

    const menu_item = await Menu.findOne({ where: info });
    res.json(menu_item);
  } catch (error) {
    console.error("Error fetching menu item ", error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { time, day, mess_type, description } = req.body;
    const existingMenuitem = await Menu.findOne({
      where: { time: time, day: day, mess_type: mess_type },
    });
    if (existingMenuitem) {
      return res.status(400).json({ error: "Menu item already exists" });
    }
    const newMenuItem = await Menu.create({
      time: time,
      day: day,
      mess_type: mess_type,
      description: description,
    });
    res
      .status(201)
      .json({ message: "Menu item created successfully", menu: newMenuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    // Extract room ID from request parameters
    const keyinfo = req.body;

    // Find the room by ID
    const menu_item = await Menu.findOne({ where: keyinfo });

    // If menu_item is not found, send a 404 status code with an error message
    if (!menu_item) {
      return res.status(404).json({ error: "menu item not found" });
    }

    // Delete the menu_item
    await menu_item.destroy();

    // Send success response
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    // Extract menu item details from request parameters
    const { time, day, mess_type, new_description } = req.body;

    // Find the menu item
    const menu_item = await Menu.findOne({
      where: { time: time, day: day, mess_type: mess_type },
    });

    // If menu_item is not found, send a 404 status code with an error message
    if (!menu_item) {
      return res.status(404).json({ error: "menu_item not found" });
    }

    // Update menu item details
    if (new_description) menu_item.description = new_description;

    // Save the updated menu item
    await menu_item.save();

    // Send success response
    res.json({ message: "Menu item updated successfully", menu_item });
  } catch (error) {
    // If an error occurs, send a 500 status code with an error message
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu" });
  }
};
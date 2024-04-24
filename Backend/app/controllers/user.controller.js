const db = require("../models");

const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.messAdminBoard = (req, res) => {
  res.status(200).send("Mess admin Content.");
};
exports.cleanAdminBoard = (req, res) => {
  res.status(200).send("Clean admin Content.");
};

exports.getUsers = async (_, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: error.message }); // Send the actual error message
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error retriving user info ");
    res.status(500).json({ error: error.message });
  }
};

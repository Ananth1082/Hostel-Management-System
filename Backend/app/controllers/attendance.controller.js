const db = require("../models"); // Import the coupon model
const { leave, attendance, user } = db;

exports.getAttendance = async (req, res) => {
  try {
    const { userId } = req.body;
    const userAttendance = await attendance.findAll({
      where: { userId: userId },
    });
    res.status(201).json({
      message: "User attendance retrieved successfully",
      userAttendance,
    });
  } catch (error) {
    console.error("Error retrieving your attendance:", error);
    res.status(500).json({ error: "Failed to retrieve user attendance" });
  }
};
exports.applyLeave = async (req, res) => {
  try {
    const { userId, type, fromDate, toDate, reason } = req.body;

    const newLeave = await leave.create({
      userId: userId,
      leaveType: type,
      fromDate: fromDate,
      toDate: toDate,
      description: reason,
    });
    res.status(201).json({ message: "Leave applied successfully", newLeave });
  } catch (error) {
    console.error("Error applying for leave:", error);
    res.status(500).json({ error: "Failed to apply for leave" });
  }
};
exports.getAttendanceList = async (req, res) => {
  try {
    const attendanceList = await attendance.findAll();
    res.status(201).json({
      message: "Attendance list retrieved successfully",
      attendanceList,
    });
  } catch (error) {
    console.error("Error retrieving attendance list:", error);
    res.status(500).json({ error: "Failed to retrieve attendance list" });
  }
};
exports.getLeaveList = async (req, res) => {
  try {
    const leaveList = await leave.findAll();
    res
      .status(201)
      .json({ message: "Leave list retrieved successfully", leaveList });
  } catch (error) {
    console.error("Error retrieving leave list:", error);
    res.status(500).json({ error: "Failed to retrieve leave list" });
  }
};
exports.approveLeave = async (req, res) => {
  try {
    const { userId,fromDate } = req.body;
    const leaveToApprove = await leave.findOne({
      where: {userId: userId, fromDate: fromDate},
    });
    if (!leaveToApprove) {
      return res.status(404).json({ error: "Leave not found" });
    }
    leaveToApprove.isApproved = true;
    await leaveToApprove.save();
    res
      .status(201)
      .json({ message: "Leave approved successfully", leaveToApprove });
  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).json({ error: "Failed to approve leave" });
  }
};

exports.attendance = async (req, res) => {
  try {
    const user_list = await user.findAll({ attributes: ["id"] });
    console.log(user_list);
    for (let i = 0; i < user_list.length; i++) {
      await attendance.create({
        userId: user_list[i].id,
        date: new Date().toISOString().slice(0, 10),
        isPresent: false,
      });
    }
    res
      .status(201)
      .json({ message: "Attendance marked successfully", users: user_list });
  } catch (error) {
    console.error("Error making attendance:", error);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};
exports.markPresent = async (req, res) => {
  try {
    const { userId } = req.body;
    const userAttendance = await attendance.findOne({
      where: { userId: userId, date: new Date().toISOString().slice(0, 10) },
    });
    if (!userAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    userAttendance.isPresent = true;
    await userAttendance.save();
    res
      .status(201)
      .json({ message: "Attendance marked successfully", userAttendance });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ error: "Failed to mark attendance" });
  }
};

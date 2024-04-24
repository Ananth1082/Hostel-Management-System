const db = require("../models");
const notification = db.notification;

exports.sendNotification = async (req, res) => {
  try {
    const { title, message, senderId, recipientId } = req.body;
    const newNotification = await notification.create({
      title: title,
      message: message,
      senderId: senderId,
      recipientId: recipientId,
    });
    res
      .status(201)
      .json({ message: "Notification sent successfully", newNotification });
  } catch (error) {
    res.status(500).json({ error: "Failed to send notification" });
  }
};
exports.getNotifications = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const userNotifications = await notification.findAll({
      where: { recipientId: recipientId },
    });
    res.status(201).json({
      message: "User notifications retrieved successfully",
      userNotifications,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user notifications" ,error:error.message});
  }
};
exports.markRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await notification.update(
      { isRead: true },
      { where: { id: notificationId } }
    );
    res.status(201).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read",error:error.message });
  }
};
exports.deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await notification.destroy({ where: { id: notificationId } });
    res.status(201).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
};
exports.updateNotification = async (req, res) => {
  try {
    const { notificationId, title, message } = req.body;
    const newNotification = await notification.update(
      { title: title, message: message },
      { where: { id: notificationId } }
    );
    res
      .status(201)
      .json({ message: "Notification updated successfully", newNotification });
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification" });
  }
};

exports.showAllNotifications = async (req, res) => {
  try {
    const notifications = await notification.findAll();
    res.status(201).json({
      message: "All notifications retrieved successfully",
      notifications,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
};

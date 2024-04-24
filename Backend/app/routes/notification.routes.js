const controller = require("../controllers/notification.controller");

module.exports = function (app) {
  app.post("/notification/send", controller.sendNotification);
  app.get("/notification/get/:recipientId", controller.getNotifications);
  app.get("/notification/markRead/:notificationId", controller.markRead);
  app.get("/notification/delete/:notificationId", controller.deleteNotification);
  app.post("/notification/update", controller.updateNotification);
  app.get("/admin/notification/get", controller.showAllNotifications);
};

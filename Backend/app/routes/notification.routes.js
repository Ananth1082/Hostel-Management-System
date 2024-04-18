const controller = require("../controllers/notification.controller");

module.exports = function (app) {
  app.post("/admin/notification/send", controller.sendNotification);
  app.post("/notification/get", controller.getNotifications);
  app.post("/notification/markRead", controller.markRead);
  app.post("/notification/delete", controller.deleteNotification);
  app.post("/notification/update", controller.updateNotification);
  app.get("/admin/notification/get", controller.showAllNotifications);
};

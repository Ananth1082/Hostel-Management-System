const controller = require("../controllers/menu.controller");
//No operations use 
module.exports = function (app) {
  app.get("/menu", controller.getAllMenus);
  app.get("/menu-item", controller.getMenuByDayTime);
  app.post("/mess-admin/createmenu",controller.createMenuItem);
  app.post("/mess-admin/deletemenu",controller.deleteMenuItem)
  app.post("/mess-admin/updatemenu",controller.updateMenuItem);
};
    
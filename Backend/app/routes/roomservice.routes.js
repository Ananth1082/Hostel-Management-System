const controller = require('../controllers/roomservice.controller');

exports = module.exports = function (app) {
  app.post('/clean-admin/roomservice', controller.getAllRoomServices);
  app.post('/createroomservice', controller.createRoomService);
  app.get('/deleteroomservice/:id', controller.deleteRoomService);
  app.post('/admin/updateroomservice', controller.updateRoomService);
}
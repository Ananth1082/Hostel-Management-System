const controller = require("../controllers/coupon.controller");

module.exports = function (app) {
  app.post("/coupon/get", controller.getUserCoupon);
  app.post("/coupon/create", controller.createCoupon);
  app.post("/coupon/release", controller.releaseCoupon);
  app.get("/coupon/mess-admin/allCoupons", controller.getAllCoupons);
  app.post("/coupon/mess-admin/deleteCoupon", controller.deleteCoupons);
  app.post("/mess/coupon/check",controller.checkCoupon)
};

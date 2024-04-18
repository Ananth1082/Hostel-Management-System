const controller = require("../controllers/attendance.controller");

module.exports = function (app) {
  app.post("/attendance/getStudentAttendance", controller.getAttendance);
  app.post("/attendance/applyLeave", controller.applyLeave);
  app.get("/admin/attendance/attendanceList", controller.getAttendanceList);
  app.get("/admin/attendance/leaveList", controller.getLeaveList);
  app.post("/admin/attendance/approve", controller.approveLeave);
  app.post("/admin/attendance", controller.attendance);
  app.post("/admin/attendance/present", controller.markPresent);
};

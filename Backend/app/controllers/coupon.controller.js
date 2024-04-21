const db = require("../models"); // Import the coupon model
const {generateRandomString} = require("../Helper/genrateRandomString");
const coupon = db.coupon;
const ticket = db.ticket;


exports.getUserCoupon = async (req, res) => {
  try {
    const { userId } = req.body;
    const userCoupon = await coupon.findOne({
      where: { userId: userId },
    });
    res
      .status(201)
      .json({ message: "User coupon retrieved successfully", userCoupon });
  } catch (error) {
    console.error("Error retrieving your coupon:", error);
    res.status(500).json({ error: "Failed to retrieve user coupon" });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const couponCode = generateRandomString(10);
    const existingCoupon = await coupon.findOne({
      where: { userId: userId },
    });
    if (existingCoupon) {
      return res.status(400).json({ error: "User already has a coupon" });
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    try {
      const newCoupon = await coupon.create({
        couponCode: couponCode,
        userId: userId,
        type: type,
        expirationDate: expirationDate,
      });

      // Create meal tickets for each day until the expiration date
      let currentDate = new Date();
      const tickets = [];
      while (currentDate <= expirationDate) {
        for (let i = 0; i < 4; i++) {
          tickets.push({
            couponCode: couponCode,
            meal: db.MEALS[i],
            date: new Date(currentDate), // Create a new Date object
            // isAvailable is true by default
          });
        }
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }

      // Bulk insert meal tickets
      await ticket.bulkCreate(tickets);

      res
        .status(201)
        .json({ message: "Coupon created successfully", coupon: newCoupon });
    } catch (error) {
      console.error("Error creating coupon:", error);
      res.status(500).json({ error: "Failed to create tickets" });
    }
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Failed to create coupon" });
  }
};

exports.releaseCoupon = async (req, res) => {
  try {
    const { couponCode, startDate, endDate } = req.body;

    await ticket.update(
      { isAvailable: false },
      {
        where: {
          couponCode: couponCode,
          date: {
            [db.Sequelize.Op.between]: [startDate, endDate],
          },
        },
      }
    );
    res.status(201).json({
      message: `Coupon released successfully from ${startDate} to ${endDate}`,
    });
  } catch (error) {
    console.error("Error releasing coupon:", error);
    res.status(500).json({ error: "Failed to release coupon" });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await coupon.findAll();
    res
      .status(201)
      .json({ message: "All coupons retrieved successfully", coupons });
  } catch (error) {
    console.error("Error retrieving coupons:", error);
    res.status(500).json({ error: "Failed to retrieve coupons" });
  }
};

exports.deleteCoupons = async (req, res) => {
  try {
    const { couponCode } = req.body;
    await coupon.destroy({ where: { couponCode: couponCode } });
    res.status(201).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ error: "Failed to delete coupon" });
  }
};

exports.checkCoupon = async (req, res) => {
  try {
    const { couponCode, date, meal } = req.body;
    await ticket
      .findOne({
        where: {
          couponCode: couponCode,
          date: date,
          meal: meal,
        },
      })
      .then((ticket) => {
        if (!ticket) {
          res.status(401).json({ message: "Coupon not found" });
        } else {
          if (!ticket.isAvailable) {
            res.status(301).json({ message: "Coupon already used" });
          } else {
            res.status(201).json({ message: "Coupon is valid" });
            ticket.update({ isAvailable: false });
          }
        }
      });
  } catch (error) {
    console.error("Error checking coupon:", error);
    res.status(501).json({ error: "Failed to check coupon" });
  }
};

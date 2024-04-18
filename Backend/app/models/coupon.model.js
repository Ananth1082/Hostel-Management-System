module.exports = (sequelize, Sequelize) => {
  const Coupon = sequelize.define(
    "coupons",
    {
      couponCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: Sequelize.ENUM("North", "South"),
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Coupon;
};


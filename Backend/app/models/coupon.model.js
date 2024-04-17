module.exports = (sequelize, Sequelize) => {
    const Coupon = sequelize.define('coupons', {
      couponCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('North','South'),
        allowNull: false,
      },
      expirationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
    });
  
    return Coupon;
  };
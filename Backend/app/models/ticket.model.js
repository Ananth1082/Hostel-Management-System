module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define(
    "ticket",
    {
      couponCode: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      meal: {
        type: Sequelize.ENUM("Breakfast", "Lunch", "Tea","Dinner"),
        allowNull: false,
        primaryKey: true,
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return Ticket;
};

module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define(
    "menu",
    {
      time: {
        type: Sequelize.ENUM("Breakfast", "Lunch", "Tea", "Dinner"),
        allowNull: false,
        primaryKey: true,
      },
      day: {
        type: Sequelize.ENUM(
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ),
        allowNull: false,
        primaryKey: true,
      },
      mess_type: {
        type: Sequelize.ENUM("North", "South"),
        primaryKey: true,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Menu;
};

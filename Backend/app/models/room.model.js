module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define(
    "room",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      block: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          "Single-AC",
          "Double-AC",
          "Single-Non-Ac",
          "Double-Non-Ac"
        ),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );
  return Room;
};

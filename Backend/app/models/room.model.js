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
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      occupants1: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      occupants2: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      // Add more properties as needed
    },
    {
      timestamps: false, // Disable timestamps
    }
  );
  return Room;
};

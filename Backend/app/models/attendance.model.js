module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define(
    "attendance",
    {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
      },
      isPresent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Attendance;
};

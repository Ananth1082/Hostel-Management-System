module.exports = (sequelize, Sequelize) => {
  const Leave = sequelize.define(
    "leave",
    {
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      fromDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      toDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      leaveType: {
        type: Sequelize.ENUM("Casual", "Regular", "End of Semester", "Medical", "Others"),
        allowNull: false,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },

    {
      timestamps: false,
    }
  );

  return Leave;
};
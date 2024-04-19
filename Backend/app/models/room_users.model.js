module.exports = (sequelize, Sequelize) => {
  const Room_User = sequelize.define('room_user'
  ,{
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    room_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // Add more properties as needed
  },
  {
    timestamps: false, // Disable timestamps
  });
  return Room_User;
}
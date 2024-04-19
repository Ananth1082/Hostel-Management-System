module.exports = (sequelize, Sequelize) => {
  const RoomService = sequelize.define("roomservice", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId:{
      type:Sequelize.INTEGER,
      allowNull: false,
      
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
  });
  return RoomService;
};

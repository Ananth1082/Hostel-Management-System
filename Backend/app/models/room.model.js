module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define(
    "room",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate:{
          isValid(value){
            if(99<value && value<1000)
              throw new Error("Invalid Room ID")
          }
        }
      },
      block: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("Single-AC", "Double-AC","Single-Non-Ac","Double-Non-Ac" ),
        allowNull: false,
      },
      // Add more properties as needed
    },
    {
      timestamps: false, // Disable timestamps
    }
  );
  return Room;
};

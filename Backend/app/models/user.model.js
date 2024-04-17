module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isIdFormat(value) {
            // Check if the id matches the specified format "NNMYYBBnnn"
            if (!/^NNM\d{2}[A-Z]{2}\d{3}$/.test(value)) {
              throw new Error("Incorrect order of usn");
            }
          },
        },
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail:true
        }
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false, // Disable timestamps
    }
  );

  return User;
};

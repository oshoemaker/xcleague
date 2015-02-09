"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    carrier: DataTypes.STRING,
    salt: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    pilot: DataTypes.BOOLEAN,
    driver: DataTypes.BOOLEAN,
    ushpaNumber: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    emergencyName: DataTypes.STRING,
    emergencyPhone: DataTypes.STRING,
    emergencyRelation: DataTypes.STRING,
    bloodType: DataTypes.STRING,
    insurance: DataTypes.TEXT,
    hasLicense: DataTypes.BOOLEAN,
    hasSmartphone: DataTypes.BOOLEAN,
    hasVehicle: DataTypes.BOOLEAN,
    year: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
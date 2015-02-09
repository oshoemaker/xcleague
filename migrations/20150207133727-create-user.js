"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first: {
        type: DataTypes.STRING
      },
      last: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      carrier: {
        type: DataTypes.STRING
      },
      salt: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      admin: {
        type: DataTypes.BOOLEAN
      },
      type: {
        type: DataTypes.INTEGER
      },
      ushpaNumber: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER
      },
      emergencyName: {
        type: DataTypes.STRING
      },
      emergencyPhone: {
        type: DataTypes.STRING
      },
      emergencyRelation: {
        type: DataTypes.STRING
      },
      bloodType: {
        type: DataTypes.STRING
      },
      insurance: {
        type: DataTypes.TEXT
      },
      hasLicense: {
        type: DataTypes.BOOLEAN
      },
      hasSmartphone: {
        type: DataTypes.BOOLEAN
      },
      hasVehicle: {
        type: DataTypes.BOOLEAN
      },
      year: {
        type: DataTypes.STRING
      },
      make: {
        type: DataTypes.STRING
      },
      model: {
        type: DataTypes.TEXT
      },
      pilot: {
        type: DataTypes.BOOLEAN
      },
      driver: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Users").done(done);
  }
};
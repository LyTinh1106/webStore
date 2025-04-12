import { Sequelize, DataTypes } from 'sequelize';


    const sequelize = new Sequelize('sqlite::memory:');
    const User = sequelize.define('User', {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'customer' 
        }
      }, {
        tableName: 'account', 
        timestamps: true   
      });
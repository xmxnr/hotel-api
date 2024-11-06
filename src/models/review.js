'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.hotel)
    }
  }
  review.init({
    rating: {type: DataTypes.DECIMAL,
      allowNull: false
    },
    comment:{type: DataTypes.STRING,
      allowNull: false
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hotel',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Course }) {
            this.hasMany(Course, { foreignKey: 'categoryId' });
        }
        toJSON() {
            return {
                ...this.get(),
                id: undefined,
            };
        }
    }
    Category.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: 'categories',
            timestamps: false,
            modelName: 'Category',
        },
    );
    return Category;
};

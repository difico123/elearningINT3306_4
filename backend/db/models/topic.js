'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Course }) {
            this.belongsTo(Course, { foreignKey: 'courseId', onDelete: 'cascade', hooks: true,  });
        }
    }
    Topic.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                references: { model: 'courses', key: 'id' },
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: 'topics',
            modelName: 'Topic',
        },
    );
    return Topic;
};

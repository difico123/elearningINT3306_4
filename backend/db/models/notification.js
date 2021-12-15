'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Course }) {
            // define association here
            this.belongsTo(Course, {
                foreignKey: 'courseId',
                onDelete: 'cascade',
            });
            this.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });
        }
    }

    Notification.init(
        {
            courseId: {
                type: DataTypes.INTEGER,
                references: { model: 'courses', key: 'id' },
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            details: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            viewed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            isConfirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            createdAt: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'notifications',
            modelName: 'Notification',
        },
    );
    return Notification;
};

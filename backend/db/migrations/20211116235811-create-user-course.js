'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface
            .createTable('UserCourses', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: DataTypes.INTEGER,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    references: { model: 'users', key: 'id' },
                    allowNull: false,
                },
                courseId: {
                    type: DataTypes.INTEGER,
                    references: { model: 'courses', key: 'id' },
                    allowNull: false,
                },
                rating: {
                    type: DataTypes.ENUM('1', '2', '3', '4', '5'),
                    defaultValue: '1',
                    allowNull: false,
                },
                isComplete: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                marks: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false,
                },
                dateAdded: {
                    type: 'TIMESTAMP',
                    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
                    allowNull: false,
                },
                lastUpdated: {
                    type: 'TIMESTAMP',
                    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
                    allowNull: false,
                },
            })
            .then(() => {
                queryInterface.addIndex('UserCourses', ['userId', 'courseId'], {
                    unique: true,
                });
            });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('UserCourses');
    },
};

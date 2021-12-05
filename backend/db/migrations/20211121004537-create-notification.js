'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Notifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            courseId: {
                type: DataTypes.INTEGER,
                references: { model: 'courses', key: 'id' },
                allowNull: false,
            },
            senderId: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
            topic: {
                type: DataTypes.STRING,
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
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            updatedAt: {
                type: 'TIMESTAMP',
                defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('Notifications');
    },
};

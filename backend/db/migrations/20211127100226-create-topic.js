'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Topics', {
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
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
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
        await queryInterface.dropTable('Topics');
    },
};

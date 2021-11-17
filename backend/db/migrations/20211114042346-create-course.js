'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('Courses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            instructorId: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                references: { model: 'categories', key: 'id' },
                allowNull: false,
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            imageUrl: {
                type: DataTypes.STRING,
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
        });
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('Courses');
    },
};

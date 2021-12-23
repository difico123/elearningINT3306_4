'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('questions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            quizId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'quizzes', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            marks: {
                type: DataTypes.INTEGER,
                defaultValue: 5,
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
        await queryInterface.dropTable('questions');
    },
};

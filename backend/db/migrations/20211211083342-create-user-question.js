'use strict';
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('userquestions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'questions', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            choiceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'choices', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade',
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
        })
        .then(() => {
            queryInterface.addIndex('userquestions', ['userId', 'questionId'], {
                unique: true,
            });
        });;
    },
    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('userquestions');
    },
};

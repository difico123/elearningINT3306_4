'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    UserQuestion.init(
        {
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
        },
        {
            sequelize,
            modelName: 'UserQuestion',
        },
    );
    return UserQuestion;
};

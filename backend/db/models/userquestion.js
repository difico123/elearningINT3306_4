'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User,Question,Choice}) {
            // define association here
            this.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });
            this.belongsTo(Question, { foreignKey: 'questionId', onDelete: 'cascade' });
            this.belongsTo(Choice, { foreignKey: 'choiceId', onDelete: 'cascade' });

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
            tableName: 'userquestions',
            modelName: 'UserQuestion',
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'questionId'],
                },
            ],
        },
    );
    return UserQuestion;
};

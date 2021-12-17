'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Quiz, Choice,User }) {
            // define association here
            this.belongsTo(Quiz, { foreignKey: 'quizId', onDelete: 'cascade' });
            this.hasMany(Choice, {
                foreignKey: 'QuestionId',
                onDelete: 'CASCADE',
                hooks: true,
            });
            this.belongsToMany(User, {
                through: 'userquestions',
                foreignKey: 'userId',
            });
        }
    }
    Question.init(
        {
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
        },
        {
            sequelize,
            tableName: 'questions',
            modelName: 'Question',
        },
    );
    return Question;
};

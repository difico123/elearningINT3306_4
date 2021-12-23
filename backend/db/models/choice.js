'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Choice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Question }) {
            // define association here
            this.belongsTo(Question, {
                foreignKey: 'questionId',
                onDelete: 'cascade',
            });
        }
    }
    Choice.init(
        {
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'questions', key: 'id' },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            isAnswer: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: 'choices',
            modelName: 'Choice',
        },
    );
    return Choice;
};

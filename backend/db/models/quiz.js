'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Topic }) {
            // define association here
            this.belongsTo(Topic, {
                foreignKey: 'topicId',
                onDelete: 'cascade',
            });
        }
    }
    Quiz.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            topicId: {
                type: DataTypes.INTEGER,
                references: { model: 'courses', key: 'id' },
                allowNull: false,
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            shown: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            tableName: 'quizzes',
            modelName: 'Quiz',
        },
    );
    return Quiz;
};

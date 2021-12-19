'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserCourse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Course, User }) {
            // define association here
            this.belongsTo(Course, {
                foreignKey: 'courseId',
                onDelete: 'cascade',
            });
            this.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });
        }
    }
    UserCourse.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: DataTypes.ENUM('1', '2', '3', '4', '5'),
                defaultValue: '1',
                allowNull: false,
            }
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'usercourses',
            modelName: 'UserCourse',
            indexes: [
                {
                    unique: true,
                    fields: ['userId', 'courseId'],
                },
            ],
        },
    );
    return UserCourse;
};

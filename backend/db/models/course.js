'use strict';
const { Model } = require('sequelize');

let date = new Date();
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Category, User, UserCourse }) {
            this.belongsTo(Category, {
                foreignKey: 'CategoryId',
                as: 'categories',
                onDelete: 'cascade',
            });
            this.belongsTo(User, {
                foreignKey: 'instructorId',
                as: 'users',
                onDelete: 'cascade',
            });
            this.belongsToMany(User, {
                through: 'usercourses',
                foreignKey: 'courseId',
                onDelete: 'CASCADE',
            });
        }

        toJSON() {
            return {
                ...this.get(),
                CategoryId: undefined,
                instructorId: undefined,
            };
        }
    }
    Course.init(
        {
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
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER,
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
        },
        {
            sequelize,
            tableName: 'courses',
            timestamps: false,
            modelName: 'Course',
        },
    );
    return Course;
};

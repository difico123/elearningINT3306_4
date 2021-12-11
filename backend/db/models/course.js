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
        static associate({ Category, User, UserCourse, Topic, Notification }) {
            this.belongsTo(Category, {
                foreignKey: 'categoryId',
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
            this.hasMany(Topic, {
                foreignKey: 'courseId',
                onDelete: 'CASCADE',
                hooks: true,
            });
            this.hasMany(Notification, {
                foreignKey: 'courseId',
                onDelete: 'cascade',
            });
        }

        toJSON() {
            return {
                ...this.get(),
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
                defaultValue: false,
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

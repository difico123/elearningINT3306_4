'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Course, UserCourse, Notification,Question }) {
            // define association here
            this.hasMany(Course, {
                foreignKey: 'instructorId',
                onDelete: 'cascade',
                hooks: true,
            });
            this.belongsToMany(Course, {
                through: 'usercourses',
                foreignKey: 'userId',
            });
            this.belongsToMany(Question, {
                through: 'userquestions',
                foreignKey: 'userId',
            });
            this.hasMany(Notification, { foreignKey: 'userId' });
        }
        toJSON() {
            return {
                ...this.get(),
                id: undefined,
                resetPasswordToken: undefined,
                resetPasswordExpire: undefined,
                password: undefined,
            };
        }
    }
    User.init(
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
            dateAdded: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
            lastUpdated: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'users',
            modelName: 'User',
        },
    );
    return User;
};

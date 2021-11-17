'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    uuid: 'd18cdc82-0941-48a8-940f-7c2e5a82e914',
                    firstName: 'John',
                    lastName: 'Qahn',
                    email: 'admin@gmail.com',
                    phoneNumber: 12345678,
                    address: 'Hoang Cuong Thanh Ba Phu Tho',
                    city: 'Phu Tho',
                    role: 2,
                    password:
                        '$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.',
                },
                {
                    uuid: 'd18cdc82-0941-48a8-940f-7c2e588qe914',
                    firstName: 'John',
                    lastName: 'Qahn',
                    email: 'user1@gmail.com',
                    phoneNumber: 12345678,
                    address: 'Hoang Cuong Thanh Ba Phu Tho',
                    city: 'Phu Tho',
                    role: 1,
                    password:
                        '$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.',
                },
                {
                    uuid: 'd18cdc82-0941-48a8-940f-7c2e5882w914',
                    firstName: 'John',
                    lastName: 'Qahn',
                    email: 'instructor1@gmail.com',
                    phoneNumber: 12345678,
                    address: 'Hoang Cuong Thanh Ba Phu Tho',
                    city: 'Phu Tho',
                    role: 0,
                    password:
                        '$2a$10$xP7NXfIrxLPyL1qB1qBf.eOLi8iLrQqQQuzCO9kPXYeWz7NHbTuZ.',
                },
            ],
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};

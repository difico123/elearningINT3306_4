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
            'categories',
            [
                {
                    name: 'Công nghệ',
                },
                {
                    name: 'Kinh doanh',
                },
                {
                    name: 'Sáng tạo',
                },
                {
                    name: 'Kỹ năng cá nhân',
                },
                {
                    name: 'Ngoại ngữ',
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

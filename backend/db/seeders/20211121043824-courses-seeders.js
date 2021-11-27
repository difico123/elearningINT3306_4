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
            'courses',
            [
                {
                    name: 'javascript cơ bản cho người mới bắt đầu',
                    description: 'đây là khoá học về javascript',
                    categoryId: 1,
                    instructorId: 3,
                },
                {
                    name: 'khoá học kinh doanh cơ bản cho người mới bắt đầu',
                    description: 'đây là khoá học về khoá học kinh doanh',
                    categoryId: 2,
                    instructorId: 3,
                },
                {
                    name: 'khoá học Sáng tạo cơ bản cho người mới bắt đầu',
                    description: 'đây là khoá học về khoá học ',
                    categoryId: 3,
                    instructorId: 3,
                },
                {
                    name: 'khoá học Kỹ năng cá nhân cơ bản cho người mới bắt đầu',
                    description:
                        'đây là khoá học về khoá học Kỹ năng cá nhân cơ bản ',
                    categoryId: 3,
                    instructorId: 3,
                },
                {
                    name: 'khoá học tiếng anh cơ bản cho người mới bắt đầu',
                    description:
                        'đây là khoá học về khoá học khoá học tiếng anh',
                    categoryId: 3,
                    instructorId: 3,
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

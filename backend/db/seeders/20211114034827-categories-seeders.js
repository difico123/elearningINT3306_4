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
                    name: 'IT và phần mềm',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg',
                },
                {
                    name: 'Kinh doanh',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg',
                },
                {
                    name: 'Lập trình',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg',
                },
                {
                    name: 'Sáng tạo',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg',
                },
                {
                    name: 'Phát triển bản thân',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg',
                },
                {
                    name: 'Marketing',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg',
                },
                {
                    name: 'Nghệ thuật',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg',
                },
                {
                    name: 'Nhiếp ảnh',
                    imageUrl:
                        'https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg',
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

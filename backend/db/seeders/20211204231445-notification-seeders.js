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
      'notifications',
      [
          {
              courseId: '2',
              senderId: '2',
              topic: 'Đăng ký khoá học',
              details: 'user1@gmail.com vừa đăng kí khoá học của bạn',
          },
          {
              courseId: '3',
              senderId: '2',
              topic: 'Đăng ký khoá học',
              details: 'user1@gmail.com vừa đăng kí khoá học của bạn',
          },
          {
              courseId: '4',
              senderId: '2',
              topic: 'Đăng ký khoá học',
              details: 'user1@gmail.com vừa đăng kí khoá học của bạn',
          },
          {
              courseId: '5',
              senderId: '2',
              topic: 'Đăng ký khoá học',
              details: 'user1@gmail.com vừa đăng kí khoá học của bạn',
          },
          {
              courseId: '6',
              senderId: '2',
              topic: 'Đăng ký khoá học',
              details: 'user1@gmail.com vừa đăng kí khoá học của bạn',
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
  }
};

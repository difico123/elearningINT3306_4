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
      await queryInterface.bulkInsert('topics', [{
        courseId: 1,
        title: 'abcadsfasfsafabcadsfasfsafaadsfasfsafabcadsfasfsaf',
        description: 'abcadsfasfsafabcadsfasfsafaadsfasfsafabcadsfasfsaf',
        content: '',
      }], {});
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

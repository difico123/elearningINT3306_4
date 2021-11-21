"use strict";

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
      "categories",
      [
        {
          name: "Sáng tạo",
        },
        {
          name: "Lập trình",
        },
        {
          name: "Marketing",
        },
        {
          name: "",
        },
        {
          name: "Kỹ năng cá nhân",
        },
        {
          name: "Kinh doanh",
        },
        {
          name: "Nhiếp ảnh",
        },
        {
          name: "Ngoại ngữ",
        },
      ],
      {}
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

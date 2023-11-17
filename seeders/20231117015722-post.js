'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const postsData = [];

    for (let i = 0; i < 15; i++) {
      postsData.push({
        title: `Post ${i}`,
        content: `This is the content of post ${i}.`,
        user_id: i % 5 + 1, // Assigning user_id from 1 to 5 for each post
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Posts', postsData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Posts', null, {})
  }
};

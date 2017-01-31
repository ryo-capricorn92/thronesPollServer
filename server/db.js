var Sequelize = require('sequelize');

module.exports = new Sequelize('postgres://ryo:1234@localhost:5432/thrones_polls', { logging: false });

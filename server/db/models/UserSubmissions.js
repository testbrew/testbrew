const db = require('../db');
const Sequelize = require('sequelize');
const { TEXT } = Sequelize;

const UserSubmissions = db.define('userSubmissions', {
  userSubmission: {
    type: TEXT,
  },
});

module.exports = UserSubmissions;

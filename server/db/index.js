//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/User');
const TestingPrompt = require('./models/TestingPrompt');
const UserSubmissions = require('./models/UserSubmissions');

//associations could go here!

User.hasMany(UserSubmissions);
TestingPrompt.hasMany(UserSubmissions);

module.exports = {
  db,
  models: {
    User,
    TestingPrompt,
    UserSubmissions,
  },
};

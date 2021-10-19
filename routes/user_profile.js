const express = require('express');
const getProfileData = require('../controllers/profile');
const profile_route = express.Router();

profile_route.get('/:userId',getProfileData);

module.exports = profile_route; 
const express = require('express');
const user_interests_route = express.Router();
const updateUserInterests = require('../controllers/update_user_details');
const validateUserId = require("../middleware/validateUserId");

/*
    Path: http://localhost:port/user-interests/:userId
    method : PUT
    field: user_interests array with minimum on value inside array
*/

user_interests_route.put("/:userId", validateUserId, updateUserInterests)

module.exports = user_interests_route;
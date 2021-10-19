const express = require('express');
const updateUserDetails = require('../controllers/update_user_details');
const user_details_route = express.Router();  
const validateUserId = require("../middleware/validateUserId");

/*
    Path: http://localhost:port/user-details/:userId
    method : PUT
    field: gender, date_of_birth
*/

user_details_route.put("/:userId", validateUserId, updateUserDetails)

module.exports = user_details_route;

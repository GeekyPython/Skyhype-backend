const express = require('express');
const updateStyles = require('../controllers/update_user_styles');
const validateUserId = require('../middleware/validateUserId');
const styles_section_route = express.Router();

styles_section_route.put('/:userId',validateUserId, updateStyles);

module.exports = styles_section_route;
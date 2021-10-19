const express = require("express");

const { updateActivityLinks, editProfile, updateSocialLinks } = require("../controllers/dashboard_functions");
const { getUser, getSocialLinks, getActivityLinks } = require("../controllers/get_user_data");

//Importing Routes
const validateUserId = require("../middleware/validateUserId");
const uploadImage = require('../middleware/uploadImage');
const router = express.Router();


// get User edit profile    
router.get("/:userId", getUser);


// get User social links
router.get("/update-social-links/:userId", getSocialLinks);

// get User activity lists
router.get("/update-activity-links/:userId", getActivityLinks)


/*
    Path: http://localhost:port/dashboard/:userId
    method : PUT
    field:username, fullname, description, image, designation, userType
*/
router.put("/:userId", uploadImage, editProfile);


/*
    Path: http://localhost:port/dashboard/update-activity-links/:userId
    method : PUT
    field: activity_link array
*/

router.put("/update-activity-links/:userId", validateUserId, updateActivityLinks) // here add function for updating activity_link_list



/*
    Path: http://localhost:port/dashboard/update-social-links/:userId
    method : PUT
    field: social_links array

*/
router.put("/update-social-links/:userId", validateUserId, updateSocialLinks); // here add function for updating social_link_list

/*
    Path: http://localhost:port/dashboard/:userId
    method : PUT
    field: user_interests array with minimum on value inside array
*/




module.exports = router;

const Users = require('../models/users');

const getProfileData = async (req, res) => {
    const profileData = await Users.findById(req.params.userId);
    if (profileData) return res.status(400).send("Invalid userid");

    const { username, designation, profile_image, social_link_list, styles, activity_links_list } = profileData;
    res.status(200).json({ username, designation, social_link_list, profile_image, styles, activity_links_list });
}

module.exports = getProfileData;
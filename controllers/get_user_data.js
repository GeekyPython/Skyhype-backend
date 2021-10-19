const Users = require('../models/users');
const mongoose = require("mongoose");

exports.getUser = async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send("Invalid mongoose Id");

    const user = await Users.findById(userId).select({});
    if (!user) return res.status(400).send("Invalid userId");

    res.send(user);
}


exports.getSocialLinks = async (req, res) => {
    const userId = req.params.userId;
    if (!mongoose.isValidObjectId(userId)) return res.status(400).send("Invalid mongoose Id");

    const user = await Users.findById(userId).select({});
    if (user) return res.status(400).send("Invalid userId");

    const socialLinks = {
        social_link_list: user.social_link_list
    }
    res.send(socialLinks);
}


    exports.getActivityLinks = async (req, res) => {
        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send("Invalid mongoose Id");

        const user = await Users.findById(userId);
        if (!user) return res.status(400).send("Invalid userId");

        const activityLinks = {
            activity_links_list: user.activity_links_list
        }
        res.send(activityLinks);
    }


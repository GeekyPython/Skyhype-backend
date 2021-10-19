const Joi = require("joi");
const User = require("../models/users");

const validateEditProfile = (editProfileData) => {
    const editProfileValidationSchema = Joi.object({
        fullname: Joi.string().min(5).max(50).required(),
        username: Joi.string().min(5).max(50).required(),
        description: Joi.string().empty().required(),
        designation: Joi.string().required(),
    })

    return editProfileValidationSchema.validate(editProfileData);
}

const editProfile = async (req, res) => {
    //here create function to edit user profile
    // image, designation, nameuser, description, fullname,

    // 6156c9b08a11affb43113449
    const error = validateEditProfile(req.body);
    if (error.error) return res.status(400).send("error: " + error.error.details[0].message);

    const userId = req.params.userId;
    const { userType, username, description, designation, fullname } = req.body;

    const imageData = req.file;

    try {
        const user = await User.findByIdAndUpdate(userId, { profile_image: imageData, user_type: userType, username, description, designation, fullname }, { runValidators: true, new: true })
        return res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error })
    }

    res.status(500).send("Unable to upload image");
}

const updateSocialLinks = async (req, res) => { // function to handle social media links on the user profile
    try {
        const updatedLinks = [...req.body.socialLinkList]; //List of links modified by the user in the frontend

        // Updates the user's current links list with the one in the database
        await User.findByIdAndUpdate(req.params.userId, { social_link_list: updatedLinks }, { runValidators: true });
        return res.status(200).json(req.body);
    }

    catch (error) {
        res.status(500).send(error);
    }
}


const validateActivityLinks = (activity_links) => {
    const activityLinkValidationSchema = Joi.object({
        activityLinkList: Joi.array().items({
            link: Joi.string().required(),
            title: Joi.string().min(5).max(100).required(),
            spotlight: Joi.boolean().required(),
            schedule: Joi.date().required(),
            // click_count: Joi.number().required(),
            isActive: Joi.boolean().required()
        })
    })

    return activityLinkValidationSchema.validate(activity_links);
}

const updateActivityLinks = async (req, res) => {
    //function to handle activity links shown on user profile

    const error = validateActivityLinks(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    let updateActivities = [...req.body.activityLinkList];

    updateActivities = await User.findByIdAndUpdate(req.params.userId,
        {
            activity_links_list: updateActivities
        },
        {
            runValidators: true,
            new: true
        }
    );
    return res.status(200).json(updateActivities);

}


module.exports = { editProfile, updateSocialLinks, updateActivityLinks };

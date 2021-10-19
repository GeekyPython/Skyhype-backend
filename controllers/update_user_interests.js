const Joi = require('joi');
const User = require('../models/users');

const validateUserInterest = (activity_links) => {
    console.log("interest validator running");
    const userInterestValidationSchema = Joi.object({
        user_interests: Joi.array().min(1).required()
    })

    return userInterestValidationSchema.validate(activity_links);
}



const updateUserInterests = async (req, res) => {
    // function is handle updates of user interesent array

    const error = validateUserInterest(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.userId,
        { user_interests: req.body.user_interests },
        { runValidators: true, new: true })
    res.send(user);
}

module.exports = updateUserInterests;
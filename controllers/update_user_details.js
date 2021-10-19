const Joi = require('joi');
const User = require('../models/users');

const validateUserDetails = (userDetailsData) => {
    const userDetailsValidationSchema = Joi.object({
        gender: Joi.string().required(),
        date_of_birth: Joi.date().required()
    })

    return userDetailsValidationSchema.validate(userDetailsData);
}

const updateUserDetails = async (req, res) => {
    // function is used handle updates of  user details like gender and date-of-birth
    const error = validateUserDetails(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.userId,
        { gender: req.body.gender, date_of_birth: req.body.date_of_birth },
        { runValidators: true, new: true })

    res.send(user);
}

module.exports = updateUserDetails;
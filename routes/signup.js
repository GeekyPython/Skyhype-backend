const express = require("express");
const Users = require("../models/users");
const Joi = require("joi");

const router = express.Router();


const validateSignup = (signupData) => {
    const signupValidationSchema = Joi.object({
        username: Joi.string().min(5).max(50).required(),
        userType: Joi.string().required(),
        instagram_id: Joi.string().required(),
        mobile_number: Joi.string().min(10).required()
    })

    return signupValidationSchema.validate(signupData);
}
/*
    Path: http://localhost:port/signup
    method : POST
    field: 
*/
router.post("/signup", async (req, res) => {

    // full name
    // mobile number
    // inst id
    // user type
    // here write logic signup

    const error = validateSignup(req.body);
    if (error.error) return res.status(400).send(error.error.details[0].message);

    // check the user is already registered or not

    let user = new Users({
        username: req.body.username,
        user_type: req.body.userType,
        instagram_id: req.body.instagram_id,
        mobile_number: req.body.mobile_number
    });

    user = await user.save();
    res.send(user);
})


/*
    Path: http://localhost:port/skyhype/login
    method: POST
    field: -
        
*/
router.post("/login", (req, res) => {
    // here write logic for login page
    // use mobile number for login the user
})

module.exports = router;
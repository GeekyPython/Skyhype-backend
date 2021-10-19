const express = require("express");
const Users = require("../models/users");
const Audit = require("../models/audit");
const router = express.Router();
const Joi = require("joi");


const validateSignup = (signupData) => {
    const SignUpValidationSchema = Joi.object({
        fullname: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).email().required(),
        phone: Joi.string().required(),
        instagram: Joi.string().required(),
        user_type: Joi.string().required(),
    })

    return SignUpValidationSchema.validate(signupData);
}

router.post("/user", async (req, res) => {

    // console.log("We have got an request");

    try {
        let user = await Audit.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        if (user) return res.status(400).send("User is already registerd with same email or phone number")

        const error = validateSignup(req.body);
        if (error.error) return res.status(400).send("error: " + error.error.details[0].message);

        // user = await Users.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
        // console.log(user);
        // if (!user) return res.status(400).send("Email or Phone number is already exist please use another Email and phone number")
        const { fullname, email, phone, instagram, user_type } = req.body;
        // console.log()
        user = new Audit({ fullname, email, phone, instagram, user_type });
        user = await user.save();
        res.send("Please wait we audit your detail.")
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;
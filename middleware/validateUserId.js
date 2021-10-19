const User = require("../models/users");


// function is used to checking that the userId is present inside database or not
// if not present then show Access Denied to user
// other if userId is present pass control to next controller function
function validateUserId(req, res, next) {
    const userId = req.params.userId;
    const user = User.findById(userId);

    if (!user)
        return res.status(401).send("Access Denied. user is not registered.")

    next();
}

module.exports = validateUserId;
const Users = require('../models/users');

const updateStyles = async (req,res) => {
    
    try
    {
        const updated_styles = req.body;
        console.log(req.params);
        await Users.findByIdAndUpdate(req.params.userId, {styles: updated_styles});
        return res.status(201).send(updated_styles);
    }
    catch(err)
    {
        res.status(401).send(err);
    }
}

module.exports = updateStyles
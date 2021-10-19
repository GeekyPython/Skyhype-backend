const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    //General user information
    fullname: { type: String },
    username: { type: String },
    gender: { type: String, enum: ['male', "female", "others"] },
    date_of_birth: Date,
    mobile_number: { type: String },
    instagram_id: { type: String },
    profile_image: { type: Object },
    description: { type: String, default: "" },
    designation: String,
    user_interests: Array,
    user_type: String,
    isAdmin: { type: Boolean, default: false },

    //User's own profile link and user's invite link
    profile_link: String,
    invite_link: String,

    invited_by: String,

    //User profile customization details are stored here
    styles: {
        background: { type: Buffer },
        font: { type: String, default: "Arial" }
    },

    //Contains a list of all social media links of the user
    social_link_list: [{
        link: String,
        isActive: { type: Boolean, default: false },
        social_media: String
    }],

    //Contains a list of all activity-based links of the user
    activity_links_list: [{
        link: { type: String, default: "" },
        title: { type: String, default: "" },
        thumbnail: { type: Object },
        spotlight: Boolean,
        schedule: Date,
        click_count: { type: Number, default: 0 },
        isActive: { type: Boolean, default: false }
    }]
});

module.exports = mongoose.model("userInformation", UserSchema);
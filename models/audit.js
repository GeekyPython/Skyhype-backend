const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    instagram: { type: String, required: true },
    user_type: { type: String, required: true }
})

module.exports = mongoose.model("Audit", AuditSchema);
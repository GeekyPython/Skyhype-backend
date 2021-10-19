require('dotenv').config();

module.exports = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT || process.env.NODE_ENV || 8080
};
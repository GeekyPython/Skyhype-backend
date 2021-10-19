const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

//Importing Routes
const dashboard_route = require("./routes/dashboard");
const signup_route = require("./routes/signup");
const profile_route = require('./routes/user_profile');
const user_details_route = require('./routes/user_details');
const user_interests_route = require('./routes/user_interests');
const styles_section_route = require('./routes/styles_section');
const Audit_route = require('./routes/audit_route');

//Miscellaneous Imports 
const { port, database_url } = require('./config');
const path = require('path');
const app = express();


//Using Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'))

//Configuring Routes
app.use("/", signup_route);
app.use("/audit", Audit_route);
app.use("/dashboard", dashboard_route);
app.use('/user', profile_route);
app.use('/user-details', user_details_route);
app.use('/user-interests', user_interests_route);
app.use('/styles', styles_section_route);

app.get("*", (req, res) => {
    console.log(process.cwd());
    res.sendFile(path.join(process.cwd(), "/build/index.html"));
});

mongoose.connect(database_url)
    .then(() => {
        console.log("Successfully connected to database..")

        app.listen(port, () => {
            console.log(`server is running on ${port}`);
        });
    })
    .catch(() => {
        console.log("Failed to connect to database..")
    });


const express = require("express");
const next = require('next')
const helmet = require('helmet');
require("colors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const dev = process.env.NODE_ENV !== 'production';

// next app
const nextApp = next({ dev });

// request handler for nextjs routes
const handler = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {

    const app = express();

    // database connection
    require('./config/db')();

    // passport auth strategies
    require("./config/passport.config");


    // parse the incoming request and respost to json format
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // protec the application against well-known vulnerabilities
    // disable x-powered-by header to obfuscate the server
    // app.disable("x-powered-by");
    app.use(helmet.hidePoweredBy());


    // vendospace routes
    app.use(require('./routes/vendoSpaceRoutes'));
    // auth routes
    app.use(require("./routes/authRoutes"));

    // API routes
    app.use('/api/v1/users', require('./routes/api/v1/userRoutes'));
    app.use('/api/v1/abuses', require('./routes/api/v1/abuseRoutes'));
    app.use('/api/v1/accounts', require('./routes/api/v1/accountRoutes'));
    app.use('/api/v1/auctions', require('./routes/api/v1/auctionRoutes'));
    app.use('/api/v1/listings', require('./routes/api/v1/listingRoutes'));
    app.use('/api/v1/bids', require('./routes/api/v1/bidRoutes'));
    app.use('/api/v1/messages', require('./routes/api/v1/messageRoutes'));
    app.use('/api/v1/notifications', require('./routes/api/v1/notificationRoutes'));
    app.use('/api/v1/profiles', require('./routes/api/v1/profileRoutes'));
    app.use('/api/v1/spaces', require('./routes/api/v1/spaceRoutes'));
    app.use('/api/v1/user-notifications', require('./routes/api/v1/userNotificationRoutes'));

    //nextjs
    app.all("*", (req, res) => handler(req, res));

    // use custom error handler 'errorHandler' middleware
    app.use(require('./middlewares/errorHandler'));

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bold.cyan.underline));

}).catch((err) => console.err);

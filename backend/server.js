const express = require("express");
require("colors");
const { listen } = require("express/lib/application");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();

// database connection
require('./config/db')();

// parse the incoming request and respost to json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/vendoSpaceRoutes'));

// API routes
app.use('/api/v1/users', require('./routes/api/v1/userRoutes'));
app.use('/api/v1/abuses', require('./routes/api/v1/abuseRoutes'));
app.use('/api/v1/accounts', require('./routes/api/v1/accountRoutes'));
app.use('/api/v1/listings', require('./routes/api/v1/listingRoutes'));
app.use('/api/v1/bids', require('./routes/api/v1/bidRoutes'));
app.use('/api/v1/messages', require('./routes/api/v1/messageRoutes'));
app.use('/api/v1/notifications', require('./routes/api/v1/notificationRoutes'));
app.use('/api/v1/profiles', require('./routes/api/v1/profileRoutes'));
app.use('/api/v1/spaces', require('./routes/api/v1/spaceRoutes'));
app.use('/api/v1/user-notifications', require('./routes/api/v1/userNotificationRoutes'));


// use custom error handler 'errorHandler' middleware
app.use(require('./middlewares/errorHandler'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.bold.cyan.underline));
const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to ${conn.connection.host} ${conn.connection.port}`.blue.bold.underline);
    } catch (error) {
        console.error(`Error has occured: ${error}`.red.bold.underline);
    }
};
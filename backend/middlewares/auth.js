const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {

    try {
        if (!req.headers.authorization || !(req.headers.authorization.startsWith('Bearer'))) {
            throw new Error('Authorization header not found');
        }

        let token = req.headers.authorization.split(' ')[1];
        if (!token) throw new Error('No token');


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;

        next();

    } catch (error) {
        res.status(403).json({ error: `${error.message}` });
    }

});

module.exports = auth;
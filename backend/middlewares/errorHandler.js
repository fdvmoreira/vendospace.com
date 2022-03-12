
const errorHandler = (err, req, res, next) => {

    const statuCode = res.statuCode ? res.statuCode : 500;

    res.status(statuCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;
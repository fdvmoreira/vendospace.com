const { setAuthType } = require("../../config/auth.type");

/**
 * get the type of authentication
 * @param {string} str 
 * @returns string
 */
const getAuthOrigin = (str) => {
  if (str?.includes('\/login')) return 'login';
  if (str?.includes('\/register')) return 'signup';
  return 'unknown';
}

/**
 * extract authentication type from headers
 * @param {Request} req 
 * @param {Response} _res 
 * @param {Function} next 
 */
const extractAuthTypeMiddleware = (req, _res, next) => {
  switch (getAuthOrigin(req?.headers?.referer ?? "")) {
    case 'signin':
    case 'login':
      setAuthType('SIGNIN');
      break;
    case 'register':
    case 'signup':
      setAuthType('SIGNUP');
      break;
    default:
      setAuthType('DEFAULT');
  }
  next();
}

module.exports = { extractAuthTypeMiddleware, getAuthOrigin }
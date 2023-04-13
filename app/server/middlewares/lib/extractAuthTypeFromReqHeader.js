const { setAuthType } = require("../../config/auth.type");

/**
 * get the type of authentication
 * @param {string} str 
 * @returns string
 */
const getLastWordFromPath = (str) => str?.split('\/').at(-1);

/**
 * extract authentication type from headers
 * @param {Request} req 
 * @param {Response} _res 
 * @param {Function} next 
 */
const extractAuthTypeMiddleware = (req, _res, next) => {
  switch (getLastWordFromPath(req?.headers?.referer ?? "")) {
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

module.exports = { extractAuthTypeMiddleware, getLastWordFromPath }
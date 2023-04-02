/**
 * This module will be used to determine whether the authentication is SIGNIN or SIGNUP
 */
let authType = "";
/**
 * setter
 * @param {string} newAuth 
 */
const setAuthType = (newAuth) => { authType = newAuth };

/**
 * getter
 * @returns string
 */
const getAuthType = () => authType;

module.exports = { setAuthType, getAuthType };
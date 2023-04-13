const { getAuthType } = require("../server/config/auth.type");
const { getAuthOrigin, extractAuthTypeMiddleware } = require("../server/middlewares/lib/extractAuthTypeFromReqHeader");

describe("Get Authentication origin from a string ", () => {

  it("should return signup", () => {
    const URL = "http://example.com/register?into=google";
    expect(getAuthOrigin(URL)).toMatch(/signup/);
  });

  it("should return login", () => {
    const URL = "http://example.com/login?success=true";
    expect(getAuthOrigin(URL)).toMatch(/login/);
  });

  it("should return unknown", () => {
    expect(getAuthOrigin()).toMatch(/unknown/);
  });

  it("should return unknown", () => {
    const URL = "http://localhost";
    expect(getAuthOrigin(URL)).toMatch(/unknown/);
  });

  it("should return unknown", () => {
    const URL = "http://example.com/users";
    expect(getAuthOrigin(URL)).toMatch(/unknown/);
  });
});

describe("Extract referer header", function () {

  it("should set authtype variable to referer header's last word", function () {
    let request = { headers: { referer: "http://localhost:3000/register" } };
    extractAuthTypeMiddleware(request, null, function (err) { });
    let authType = getAuthType();
    expect(['SIGNUP', 'REGISTER']).toContain(authType);

    request = { headers: { referer: "http://localhost:3000/login" } };
    extractAuthTypeMiddleware(request, null, function (err) { });
    authType = getAuthType();
    expect(['SIGNIN', 'LOGIN']).toContain(authType);
  });

  it("should set authType to 'DEFAULT'", function () {
    let request = { headers: { referer: "http://localhost:3000/AAAA" } };
    extractAuthTypeMiddleware(request, null, function (err) { });
    let authType = getAuthType();
    expect(authType).toMatch(/DEFAULT/);
  });

});
const { getAuthType } = require("../server/config/auth.type");
const { getLastWordFromPath, extractAuthTypeMiddleware } = require("../server/middlewares/lib/extractAuthTypeFromReqHeader");

describe("Get Last word from a URL", () => {

  it("should throw an Exception", () => {
    expect(getLastWordFromPath()).toBe.undefined;
  });

  it("should return undefined it URL is empty", () => {
    const URL = "http://localhost";
    expect(getLastWordFromPath(URL)).toBe.undefined;
  });

  it("should return last word from the path", () => {
    const URL = "http://example.com/users";
    expect(getLastWordFromPath(URL)).toMatch(/users/);
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
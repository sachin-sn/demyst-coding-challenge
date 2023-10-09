const { getAllOrg, getOrg, auth } = require("./orgService");

describe("testing orgServices", () => {
  test("get all Orgs", async () => {
    const orgs = await getAllOrg();
    expect(orgs.length).toBeGreaterThan(0);
  });

  test("get org based on email", async () => {
    const org = await getOrg("google@abc.xyz");
    expect(org.name).toBe("alphabet");
    expect(org).not.toHaveProperty("password");
  });

  test("get org based on invalid email", async () => {
    const org = await getOrg("example@abc.xyz");
    expect(org).toBeNull();
  });

  test("auth with valid email and password", async () => {
    const org = await auth("google@abc.xyz", "DemystTest@23");
    expect(org).toHaveProperty("auth");
    expect(org).toHaveProperty("org");
    expect(org.org.name).toBe("alphabet");
    expect(org.auth.auth).toBeTruthy();
  });

  test("auth with valid email and invalid password", async () => {
    const org = await auth("google@abc.xyz", "DemystTest@23q");
    expect(org).toHaveProperty("auth");
    expect(org.auth.auth).toBeFalsy();
  });
});

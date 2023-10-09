const {
  getApplication,
  getApplications,
  newApplication,
  updateApplication,
  deleteApplication,
} = require("./applicationService");

let testApplicationId;

const mockBalanceSheetWithProfit = [
  {
    year: 2022,
    month: 12,
    profitOrLoss: 250000,
    assetsValue: 1234,
  },
  {
    year: 2022,
    month: 11,
    profitOrLoss: 1150,
    assetsValue: 5789,
  },
  {
    year: 2022,
    month: 10,
    profitOrLoss: 2500,
    assetsValue: 22345,
  },
  {
    year: 2022,
    month: 9,
    profitOrLoss: -187000,
    assetsValue: 223452,
  },
];

const mockBalanceSheetWithLoss = [
  {
    year: 2022,
    month: 12,
    profitOrLoss: -250000,
    assetsValue: 1234,
  },
  {
    year: 2022,
    month: 11,
    profitOrLoss: 1150,
    assetsValue: 5789,
  },
  {
    year: 2022,
    month: 10,
    profitOrLoss: 2500,
    assetsValue: 22345,
  },
  {
    year: 2022,
    month: 9,
    profitOrLoss: -187000,
    assetsValue: 223452,
  },
];

describe("testing application services", () => {
  test("getAllApplications", async () => {
    const applications = await getApplications("google@abc.xyz");
    expect(applications.length).toBeGreaterThan(0);
    expect(applications[0]).toHaveProperty("email");
  });
  test("newApplication", async () => {
    const application = await newApplication({
      email: "google@abc.xyz",
      status: "new",
    });
    testApplicationId = application.Id;
    expect(application.Id).not.toBe(undefined);
    expect(application.email).toBe("google@abc.xyz");
    expect(application.status).toBe("new");
  });

  test("updateApplication without balance sheet", async () => {
    const application = await updateApplication({
      Id: testApplicationId,
      email: "google@abc.xyz",
      title: "This is a test title",
      description: "this is test description",
    });
    expect(application.title).toBe("This is a test title");
    expect(application.status).toBe("in-progress");
  });

  test("getApplication for saved application", async () => {
    const application = await getApplication(testApplicationId);
    expect(application.status).toBe("in-progress");
    expect(application.balanceSheet).toBe(undefined);
  });

  test("updateApplication with profit balance sheet", async () => {
    const application = await updateApplication({
      Id: testApplicationId,
      email: "google@abc.xyz",
      title: "This is a test title",
      description: "this is test description",
      balanceSheet: mockBalanceSheetWithProfit,
      loanAmount: 1000000,
      isSubmitted: true,
    });
    expect(application.status).toBe("submitted");
    expect(application.decision.preAssessmentValue).toBe(60);
  });

  test("updateApplication with profit balance sheet wtih loan amount less than total asset values", async () => {
    const application = await updateApplication({
      Id: testApplicationId,
      email: "google@abc.xyz",
      title: "This is a test title",
      description: "this is test description",
      balanceSheet: mockBalanceSheetWithProfit,
      loanAmount: 1000,
      isSubmitted: true,
    });
    expect(application.status).toBe("submitted");
    expect(application.decision.preAssessmentValue).toBe(100);
  });

  test("updateApplication with loss balance sheet", async () => {
    const application = await updateApplication({
      Id: testApplicationId,
      email: "google@abc.xyz",
      title: "This is a test title",
      description: "this is test description",
      balanceSheet: mockBalanceSheetWithLoss,
      loanAmount: 1000000,
      isSubmitted: true,
    });
    expect(application.decision.preAssessmentValue).toBe(20);
    expect(application.decision.profitSummary).toContain("loss");
  });

  test("getApplication for submitted application", async () => {
    const application = await getApplication(testApplicationId);
    expect(application.status).toBe("submitted");
    expect(application.title).not.toBe("");
  });

  test("deleting application", async () => {
    const applications = await getApplications("google@abc.xyz");
    const updatedApplications = await deleteApplication(testApplicationId);
    expect(applications.length).not.toEqual(updatedApplications.length);
  });
});

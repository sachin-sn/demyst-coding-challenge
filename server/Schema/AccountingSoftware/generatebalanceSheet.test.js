const { generateBalanceSheet } = require("./generateBalanceSheet");

test("testing generate balance sheet", () => {
  const result = generateBalanceSheet();
  expect(result.length).toBe(12);
  expect(result[0].month).toBe(12);
});

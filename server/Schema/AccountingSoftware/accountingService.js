// this file should be used to integrate to thirdparty providers such as XERO MYOB
const { generateBalanceSheet } = require("./generateBalanceSheet");

//generating balance sheet from XERO to be integrated with XERO later
const generateBalanceSheetFromXERO = () => {
  const balanceSheet = generateBalanceSheet();
  return balanceSheet;
};

//generating balance sheet from MYOB to be integrated with MYOB later
const generateBalanceSheetFromMYOB = () => {
  const balanceSheet = generateBalanceSheet();
  return balanceSheet;
};

module.exports = {
  generateBalanceSheetFromMYOB,
  generateBalanceSheetFromXERO,
};

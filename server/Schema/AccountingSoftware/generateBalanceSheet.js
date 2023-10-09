// function to generate some random balance sheet
// This will be replaced with the third party providers such as XERO, MYOB

const date = new Date();

const year = date.getFullYear() - 1;

const generateBalanceSheet = () => {
  const balanceSheet = []; // Creating balance sheet
  // Generating monthly balance sheet
  for (let months = 12; months > 0; months--) {
    const monthlyValue = {
      year: year,
      month: months,
      profitOrLoss: generateRandomValue(-10000, 100000),
      assetsValue: generateRandomValue(0, 100000),
    };
    balanceSheet.push(monthlyValue);
  }
  return balanceSheet;
};

// Function to generate random values for balance sheet
function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  generateBalanceSheet,
};

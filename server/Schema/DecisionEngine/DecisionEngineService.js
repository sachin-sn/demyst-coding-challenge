// creatign decision engine service calculate loan amount

function calculatePreAssessment(balanceSheet, loanAmount) {
  // checking if the total assetsvalue is greater than loan amount
  const totalAssetsValue = calculateTotalAssetValue(balanceSheet);
  if (totalAssetsValue > loanAmount) {
    return 100;
  }
  // checking the total profit generated
  const totalProfit = calculateTotalProfit(balanceSheet);
  if (totalProfit > 0) {
    return 60;
  }

  // default returning the preAssessment value to 20
  return 20;
}

function calculateTotalAssetValue(balanceSheet) {
  return balanceSheet.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.assetsValue;
  }, 0);
}
function calculateTotalProfit(balanceSheet) {
  return balanceSheet.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.profitOrLoss;
  }, 0);
}
function formatAmount(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);
}

// Mocking submission to decision engine
const submitToDecisionEngine = (loanApplication, org) => {
  const { balanceSheet, loanAmount } = loanApplication;
  const totalProfit = calculateTotalProfit(balanceSheet);
  const preAssessmentValue = calculatePreAssessment(balanceSheet, loanAmount);
  let profitSummary = "";
  if (totalProfit > 0) {
    profitSummary = `the ${org.name} did exceptionally well in the year ${
      balanceSheet[0].year
    } and made a profit of ${formatAmount(totalProfit)}`;
  } else {
    profitSummary = `the ${org.name} did not do well in the year ${
      balanceSheet[0].year
    } and made a loss of ${formatAmount(totalProfit)}`;
  }
  const decisionObject = {
    Name: org.name,
    establishedYear: org.year,
    profitSummary,
    preAssessmentValue,
  };
  // Make necessary API calls to the decision engine and respond to the cliend

  return decisionObject;
};

module.exports = {
  submitToDecisionEngine,
};

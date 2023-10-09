import {
  Grid,
  Box,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography,
  Button,
  TextField,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CurrencyRupee, CreditScoreOutlined, Save } from "@mui/icons-material";
import { connect } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import loanApplicationActions from "../actions/loanApplicationActions";
import { getFromLocalStorage, formatAmount } from "../service";
import BalanceSheet from "./Balancesheet";

const accountingProvider = [
  { key: "", value: "" },
  { key: "XERO", value: "XERO" },
  { key: "MYOB", value: "MYOB" },
];

const reviewOptions = [
  { key: "", value: "" },
  { key: "Reviewed", value: true },
];

const getBalanceSheetSection = (
  accountingProviderType,
  balanceSheet,
  props
) => {
  if (accountingProviderType && !balanceSheet)
    return (
      <Button
        variant="contained"
        onClick={() => {
          props.getBalanceSheet(accountingProviderType);
        }}
      >
        Get balance sheet
      </Button>
    );
  if (balanceSheet) {
    return <BalanceSheet balanceSheet={balanceSheet} />;
  }
  return null;
};

const Loan = (props) => {
  const history = useNavigate();
  const [searchParam] = useSearchParams();
  const applId = searchParam.get("id");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [businessIdea, setBusinessIdea] = useState("");
  const [details, setDetails] = useState("");
  const [loanAmount, setLoanAmount] = useState(0);
  const [accountPrd, setaccountPrd] = useState("");
  const [reviewed, setReviewed] = useState("");
  const [balanceSheet, setBalanceSheet] = useState("");

  useEffect(() => {
    const org = props.user;
    if (!org) {
      history("/");
    }
    if (
      (props.application && props.application.Id !== applId) ||
      (!props.application && !props.isLoading)
    ) {
      if (applId) {
        props.getAppl(applId);
      }
    }
    if (
      props.application &&
      props.application &&
      props.application.Id === applId
    ) {
      const {
        title,
        description,
        loanAmount,
        accountingProvider,
        balanceSheet,
        status,
      } = props.application;
      setBusinessIdea(title);
      setDetails(description);
      setLoanAmount(loanAmount);
      setaccountPrd(accountingProvider);
      setBalanceSheet(balanceSheet);
      if (status === "submitted") {
        setIsSubmitted(true);
      }
    }
  }, [props.isloading, props.application]);

  useEffect(() => {
    if (props.application && props.application.balanceSheet) {
      setBalanceSheet(props.application.balanceSheet);
    }
    if (props.balanceSheet) {
      setBalanceSheet(props.balanceSheet);
    }
  }, [props.application, props.balanceSheet]);

  const isSubmitDisabled = () => {
    return !businessIdea || !details || !loanAmount || !accountPrd || !reviewed;
  };

  const handleSubmit = (isSubmitClicked) => {
    const application = {
      Id: applId,
      title: businessIdea,
      description: details,
      loanAmount: loanAmount,
      accountingProvider: accountPrd,
      balanceSheet: balanceSheet,
      reviewed: props.BalanceSheet ? reviewed : "",
      email: props.user.email,
      org: props.name,
      isSubmitted: isSubmitClicked,
    };
    props.updateAppl(application);
  };

  if (props.isLoading)
    return <Typography variant="body1">Loading...</Typography>;
  return (
    <Grid container spacing={2} padding={2} variant="middle">
      <Grid item xs="8">
        <Box sx={{ padding: "20px" }} variant="middle">
          <Typography variant="h5">
            <CreditScoreOutlined /> Application Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Loan no: {props.application ? props.application.Id : ""}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Applicant details:
            <br />
            Organization Name: {props.user.name} <br />
            Organization details: {props.user.description}
          </Typography>
          <FormControl variant="standard" fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel>Business Idea Title</InputLabel>
            <Input
              value={businessIdea}
              disabled={isSubmitted}
              onChange={(e) => {
                setBusinessIdea(e.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel>Business Idea description</InputLabel>
            <Input
              value={details}
              disabled={isSubmitted}
              multiline
              minRows={5}
              onChange={(e) => {
                setDetails(e.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel>loan amount</InputLabel>
            <Input
              value={loanAmount}
              disabled={isSubmitted}
              onChange={(e) => {
                setLoanAmount(e.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <CurrencyRupee />
                </InputAdornment>
              }
            />
          </FormControl>
          {!balanceSheet ? (
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              <TextField
                id="account-provider"
                disabled={isSubmitted}
                select
                label="Accounting provider"
                SelectProps={{
                  native: true,
                }}
                value={accountPrd}
                onChange={(e) => {
                  setaccountPrd(e.target.value);
                }}
              >
                {accountingProvider.map((provider) => (
                  <option key={provider.key} value={provider.value}>
                    {provider.key}
                  </option>
                ))}
              </TextField>
            </FormControl>
          ) : null}
        </Box>

        <Box sx={{ padding: "20px" }} variant="middle">
          {getBalanceSheetSection(accountPrd, balanceSheet, props)}
        </Box>
        <Box sx={{ padding: "20px" }} variant="middle">
          {balanceSheet && !isSubmitted ? (
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              <TextField
                select
                label="I have reviewed the balance sheet"
                SelectProps={{
                  native: true,
                }}
                value={reviewed}
                onChange={(e) => {
                  setReviewed(e.target.value);
                }}
              >
                {reviewOptions.map((item) => (
                  <option key={item.key} value={item.value}>
                    {item.key}
                  </option>
                ))}
              </TextField>
            </FormControl>
          ) : null}
        </Box>
        {isSubmitted ? (
          <Box sx={{ padding: "20px" }} variant="middle">
            <Alert severity="info">
              <AlertTitle>Loan proccessed</AlertTitle>
              Loan percentage:{" "}
              <strong>{props.application.decision.preAssessmentValue}%</strong>
              <br />
              Loan value:
              <strong>
                {formatAmount(
                  props.application.loanAmount *
                    (props.application.decision.preAssessmentValue / 100)
                )}
              </strong>{" "}
              <br />
              Reason:{" "}
              <strong>{props.application.decision.profitSummary}</strong>
            </Alert>
          </Box>
        ) : null}
        {!isSubmitted ? (
          <Box sx={{ padding: "20px" }} variant="middle">
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
            >
              &nbsp; Save
            </Button>
            &nbsp;
            <Button
              variant="contained"
              disabled={isSubmitDisabled()}
              onClick={() => {
                handleSubmit(true);
              }}
            >
              <Save />
              &nbsp; Submit
            </Button>
          </Box>
        ) : null}
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ padding: "20px" }} variant="middle">
          <Typography variant="h6">
            Fill in the sample application form for the loan
          </Typography>
          <Typography variant="body1" color="text.secondary" component={"div"}>
            <ul>
              <li>
                Business Idea title: provide a short description of the idea.
              </li>
              <li>
                Business Idea description: You can elaborate on the idea, with
                more details.
              </li>
              <li>
                Loan amount: You enter the loan amount entered needed for the
                business Idea
              </li>
              <li>
                Select the accounting provider and click on generate balance
                sheet button to get balance sheet of your previous years
              </li>
              <li>
                Review the balance sheet and click on on reviewed checkbox to
                enable the submit button
              </li>
            </ul>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.user || getFromLocalStorage("org"),
    application: state.loanApplications.application,
    applications: state.loanApplications.applications,
    isLoading: state.loanApplications.isLoading,
    isBalanceSheetLoading: state.loanApplications.isBalanceSheetLoading,
    balanceSheet: state.loanApplications.balanceSheet,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAppl: (applicationId) => {
      loanApplicationActions.getApplication(dispatch, applicationId);
    },
    getBalanceSheet: (acoountingType) => {
      loanApplicationActions.getBalanceSheet(dispatch, acoountingType);
    },
    updateAppl: (application) => {
      loanApplicationActions.updateApplication(dispatch, application);
    },
  };
};

export default connect(mapState, mapDispatch)(Loan);

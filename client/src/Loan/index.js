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
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  CurrencyRupee,
  CreditScoreOutlined,
  CheckBox,
  Save,
} from "@mui/icons-material";
import { connect } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import loanApplicationActions from "../actions/loanApplicationActions";
import { getFromLocalStorage } from "../service";
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

const getBalanceSheetSection = (accountingProviderType, props) => {
  if (accountingProviderType && !props.balanceSheet)
    return (
      <Button
        variant="contained"
        isDisabled={props.isBalanceSheetLoading}
        onClick={() => {
          props.getBalanceSheet(accountingProviderType);
        }}
      >
        Get balance sheet
      </Button>
    );
  if (props.balanceSheet) {
    return <BalanceSheet balanceSheet={props.balanceSheet} />;
  }
  return null;
};

const Loan = (props) => {
  const history = useNavigate();
  const [searchParam] = useSearchParams();
  const applId = searchParam.get("id");
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    const org = props.user;
    if (!org) {
      history("/");
    }
    if (!props.application && !props.isLoading) {
      if (applId) {
        props.getAppl(applId, props.applications);
      }
      if (props.application && props.application.status === "submitted") {
        setIsSubmitted(true);
      }
    }
  }, [props]);

  useEffect(() => {
    setBalanceSheet(props.balanceSheet);
  }, props.BalanceSheet);

  const [businessIdea, setBusinessIdea] = useState(
    props.application ? props.application.title : null
  );
  const [details, setDetails] = useState(
    props.application ? props.application.description : null
  );
  const [loanAmount, setLoanAmount] = useState(
    props.application ? props.application.loanAmount : null
  );
  const [accountPrd, setaccountPrd] = useState(
    props.application ? props.application.accountingProvider : null
  );
  const [reviewed, setReviewed] = useState(
    props.application ? props.application.reviewed : null
  );
  const [balanceSheet, setBalanceSheet] = useState(
    props.BalanceSheet || props.application
      ? props.application.balanceSheet
      : null
  );
  const isSubmitDisabled = () => {
    return !businessIdea || !details || !loanAmount || !accountPrd || !reviewed;
  };

  const handleSubmit = () => {
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
              type="number"
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
          {getBalanceSheetSection(accountPrd, props)}
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
        <Box sx={{ padding: "20px" }} variant="middle">
          <Button
            variant="contained"
            disabled={isSubmitDisabled()}
            onClick={() => {
              handleSubmit();
            }}
          >
            <Save />
            &nbsp; Submit
          </Button>
        </Box>
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
    getAppl: (applicationId, applications) => {
      if (applications && applications.length > 0) {
        const loanApp = applications.find((appl) => appl.Id === applicationId);
        dispatch({
          type: loanApplicationActions.GET_APPLICATION_SUCCESS,
          application: loanApp,
        });
      } else {
        loanApplicationActions.getApplication(dispatch, applicationId);
      }
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

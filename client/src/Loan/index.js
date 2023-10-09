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
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CurrencyRupee, CreditScoreOutlined } from "@mui/icons-material";
import { connect } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import loanApplicationActions from "../actions/loanApplicationActions";
import { getFromLocalStorage } from "../service";

const accountingProvider = [
  { key: "", value: "" },
  { key: "XERO", value: "XERO" },
  { key: "MYOB", value: "MYOB" },
];

const Loan = (props) => {
  const history = useNavigate();
  const [searchParam] = useSearchParams();
  const applId = searchParam.get("id");
  useEffect(() => {
    const org = props.user;
    if (!org) {
      history("/");
    }
    if (!props.application && !props.isLoading) {
      if (applId) {
        props.getAppl(applId, props.applications);
      }
    }
  }, [props]);
  const [businessIdea, setBusinessIdea] = useState();
  const [details, setDetails] = useState();
  const [loanAmount, setLoanAmount] = useState();
  const [accountPrd, setaccountPrd] = useState();
  const isSubmitDisabled = () => {
    return !businessIdea || !details || !loanAmount || !accountPrd;
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
              onChange={(e) => {
                setBusinessIdea(e.target.value);
              }}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel>Business Idea description</InputLabel>
            <Input
              value={details}
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
          <FormControl variant="standard" fullWidth sx={{ marginTop: "20px" }}>
            <TextField
              id="account-provider"
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
        </Box>
        {accountPrd ? (
          <Box margin={2}>
            <Button
              variant="contained"
              isLoading={props.isBalanceSheetLoading}
              onClick={() => {
                props.getBalanceSheet(accountPrd);
              }}
            >
              Get balance sheet
            </Button>
          </Box>
        ) : null}
        <Box margin={1}>
          <Button variant="contained" disabled={isSubmitDisabled()}>
            Submit
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ padding: "20px" }} variant="middle">
          <Typography variant="h6">
            Fill in the sample application form for the loan
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <ul>
              <li>
                Business Idea title: provide a short description of the idea.
              </li>
              <li>
                Business Idea description: You can elaborate on the idea, with
                more details.
              </li>
              <li>
                {" "}
                Loan amount: You enter the loan amount entered needed for the
                business Idea{" "}
              </li>
              <li>
                Select the accounting provider to get balance sheet of your
                previous years
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

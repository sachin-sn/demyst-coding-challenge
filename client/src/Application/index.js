import { Add, History } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import loanApplicationActions from "../actions/loanApplicationActions";
import { getFromLocalStorage, formatAmount } from "../service";

const ApplicationWidgets = (props) => {
  const appl = props.application;
  const history = useNavigate();
  return (
    <Card key={appl.Id} sx={{ margin: "10px 20px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {appl.Id}
        </Typography>
        <Divider />
        <Typography variant="h5" component="div">
          {appl.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {appl.description}
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Created Date:&nbsp;{appl.createdDate}
        </Typography>
        {appl.updatedDate ? (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Updated Date:{appl.updatedDate}
          </Typography>
        ) : null}
        <Typography
          variant="overline"
          color="text.primary"
          display="block"
          gutterBottom
        >
          Status: {appl.status}
        </Typography>
        {appl.status === "submitted" ? (
          <Box>
            <Divider />
            <Typography
              sx={{ fontSize: 12 }}
              variant="body1"
              align="justify"
              component="div"
            >
              Loan amount Requested: &nbsp;{formatAmount(appl.loanAmount)}
              <br />
              Loan amount granted: &nbsp;
              {formatAmount(
                appl.loanAmount * (appl.decision.preAssessmentValue / 100)
              )}
              <br />
              Reason: &nbsp;{appl.decision.profitSummary}
            </Typography>
          </Box>
        ) : null}
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          onClick={() => {
            history(`/Loan?id=${appl.Id}`);
          }}
        >
          open
        </Button>
      </CardActions>
    </Card>
  );
};

const Home = (props) => {
  const history = useNavigate();
  useEffect(() => {
    const org = props.org;
    if (org) {
      props.getAll(org);
    } else {
      history("/");
    }
  }, []);

  return (
    <Box padding={5}>
      <Typography variant="h6" gutterBottom>
        Existing application
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          props.newAppl(props.org, history);
        }}
      >
        <Add />
        NEW
      </Button>
      <Grid container spacing={2} alignItems="left">
        {props.applications
          ? props.applications.map((app) => (
              <Grid item xs={3}>
                <ApplicationWidgets application={app} />
              </Grid>
            ))
          : null}
      </Grid>
    </Box>
  );
};

const mapState = (state) => {
  return {
    org: state.auth.user || getFromLocalStorage("org"),
    ...state.loanApplications,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAll: (org) => {
      loanApplicationActions.getAllApplications(dispatch, org.email);
    },
    newAppl: (org, history) => {
      loanApplicationActions.newApplication(dispatch, org.email, history);
    },
  };
};

export default connect(mapState, mapDispatch)(Home);

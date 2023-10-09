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
import { getFromLocalStorage } from "../service";

const ApplicationWidgets = (props) => {
  const history = useNavigate();
  return props.applications.map((appl) => (
    <Card key={appl.Id} sx={{ maxWidth: 300, margin: "10px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {appl.Id}
        </Typography>
        <Typography variant="h5" component="div">
          {appl.title}
        </Typography>
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
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          disabled={appl.status === "submitted"}
          onClick={() => {
            history(`/Loan?id=${appl.Id}`);
          }}
        >
          open
        </Button>
      </CardActions>
    </Card>
  ));
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
    <Box padding={5} sx={{ height: "100hv" }}>
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
      <Grid padding={5} spacing={2}>
        {props.applications ? (
          <ApplicationWidgets applications={props.applications} />
        ) : null}
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

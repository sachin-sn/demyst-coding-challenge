import {
  Grid,
  Card,
  Box,
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography,
  Divider,
  CardContent,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { connect } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LockIcon from "@mui/icons-material/Lock";
import authActions from "../actions/authActions";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#efefef",
          border: "2px solid #ddd",
          padding: "5px",
        }}
      >
        <CardContent>
          <Typography variant="h5" display="block" gutterBottom>
            Login
          </Typography>
          <Divider />

          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              <InputLabel>User name</InputLabel>
              <Input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginTop: "20px" }}
            >
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button
              variant="contained"
              onClick={() => {
                props.LoginClicked(userName, password);
              }}
              startIcon={<LockIcon />}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const User = (props) => {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "#efefef",
          border: "2px solid #ddd",
          padding: "5px",
        }}
      >
        <CardContent>
          <Typography variant="h5" display="block" gutterBottom>
            Welcome!
          </Typography>
          <Divider />
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {props.user.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {props.user.details}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const Home = (props) => {
  return (
    <Grid container spacing={2} padding={2} variant="middle">
      <Grid item xs={8}>
        <Typography variant="h3" gutterBottom>
          Welcome to the loan application
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is coding challenged application created, enter user name
          password, any username password works
        </Typography>
      </Grid>
      <Grid item xs={4}>
        {!props.isAuth ? <Login {...props} /> : <User {...props} />}
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    ...state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    LoginClicked: (userName, password) => {
      dispatch({ type: authActions.LOGIN_REQUESTED, userName, password }); // login requested
      dispatch({ type: authActions.LOGIN_SUCCESSFUL }); // login successfull, mocking the  response now
    },
  };
};

export default connect(mapState, mapDispatch)(Home);

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
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LockIcon from "@mui/icons-material/Lock";
import authAuctions from "../actions/authActions";

import UserTable from "./userTables";
import { getFromLocalStorage } from "../service";

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
              <InputLabel>Email</InputLabel>
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
              {props.user.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const Home = (props) => {
  useEffect(() => {
    if (!props.users) {
      props.getAllUsers();
    }
  }, []);
  return (
    <Grid container spacing={2} padding={2} variant="middle">
      <Grid item xs={8}>
        <Typography variant="h3" gutterBottom>
          Welcome to the loan application
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is coding challenged application created, Please fill in the
          email and password
        </Typography>
        <UserTable users={props.users} />
      </Grid>
      <Grid item xs={4}>
        {!props.user ? <Login {...props} /> : <User {...props} />}
      </Grid>
    </Grid>
  );
};

const mapState = (state) => {
  return {
    user: state.auth.user || getFromLocalStorage("org"),
    isAuth: state.isAuth,
    users: state.auth.users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    LoginClicked: (userName, password) => {
      authAuctions.Login(dispatch, userName, password);
    },
    getAllUsers: () => {
      authAuctions.getAllUsers(dispatch);
    },
  };
};

export default connect(mapState, mapDispatch)(Home);

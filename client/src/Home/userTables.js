import React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

const UserTable = (props) => {
  if (props.users)
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell align="right">Details</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="right">{user.description}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">DemystTest@23</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  return null;
};

export default UserTable;

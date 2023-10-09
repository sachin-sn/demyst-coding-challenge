import { CurrencyRupee } from "@mui/icons-material";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import React from "react";

const BalanceSheet = (props) => {
  const { balanceSheet } = props;
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ fontSize: 14 }}
        color="text.secondary"
      ></Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Month</TableCell>
              <TableCell align="right">
                Profit or Loss in <CurrencyRupee sx={{ fontSize: 12 }} />
              </TableCell>
              <TableCell align="right">
                assets value in <CurrencyRupee sx={{ fontSize: 12 }} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceSheet.map((row) => (
              <TableRow
                key={row.month}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.year}
                </TableCell>
                <TableCell>{row.month}</TableCell>
                <TableCell align="right">{row.profitOrLoss}</TableCell>
                <TableCell align="right">{row.assetsValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BalanceSheet;

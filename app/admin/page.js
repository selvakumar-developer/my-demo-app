"use client";
import DownloadIcon from "@mui/icons-material/Download";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/user").then((response) => {
      console.log(response, "++++++");
      if (response.status === 200) {
        setData(response.data);
      }
    });
  }, []);

  const handleDownloadClick = (email, base64) => {
    console.log(base64, "===========");
    const indexOfSlash = base64.indexOf("/");
    const indexOfSemicolon = base64.indexOf(";");
    const fileExtension = base64.substring(indexOfSlash + 1, indexOfSemicolon);
    console.log("fileExtension: ", fileExtension);
    const a = document.createElement("a"); //Create <a>
    a.href = base64; //Image Base64 Goes here
    a.download = `${email}.${fileExtension}`; //File name Here
    a.click(); //Downloaded file
  };

  return (
    <Grid
      container
      sx={{
        width: "80%",
        margin: "auto",
        marginTop: "100px",
      }}
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography fontWeight={"bold"}>Users List</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table aria-label="simple table" component={Paper} variant="outlined">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Image
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.email}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDownloadClick(row.email, row.file)}
                      endIcon={<DownloadIcon />}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Admin;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CustomButton from "../Components/CustomButton";
import Clinical_Data from "./clinical_api_A0402971.json";
import Column from "./Column.json";
import "../App.css";

const style = {
  position: "absolute",
  top: "39%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Main = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const showColumn = () => {
    return Column.map((col, key) => {
      return (
        <>
          <TableCell style={{ width: 200 }}>
            <b>{col.col}</b>
          </TableCell>
        </>
      );
    });
  };

  const showTableData = () => {
    return Clinical_Data["alterations"].map((alterations, i) => {
      return (
        <>
          {alterations["treatment"] ? (
            <>
              {alterations["treatment"]["therapies"] ? (
                <>
                  <span className="gene">{alterations.gene}</span>
                  <span className="gene_Sub">{alterations.name}</span>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: "650px" }} aria-label="simple table">
                      <TableHead>
                        <TableRow>{showColumn()}</TableRow>
                      </TableHead>
                      {alterations["treatment"]["therapies"].map(
                        (item, index) => {
                          return (
                            <>
                              {" "}
                              <TableBody>
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="left"
                                    style={{ width: 200 }}
                                  >
                                    <span className="head_color">
                                      {item.drug}
                                    </span>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ width: 200 }}
                                  >
                                    <span className="head_color">none</span>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ width: 200 }}
                                  >
                                    <span className="head_color">
                                      {item.rationale}
                                    </span>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ width: 200 }}
                                  >
                                    <span className="head_color">
                                      {item.status}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </>
                          );
                        }
                      )}
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      );
    });
  };

  return (
    <div className="APP_show overFlowTable">
      <CustomButton label="Treatment" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginLeft: 20, marginBottom: 10 }}
          >
            Detailed Therapy Results
          </Typography>

          <div className="overFlowTable">{showTableData()}</div>
        </Box>
      </Modal>
    </div>
  );
};

export default Main;

import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ReportOfTable from "../components/ReportOfTable";

function Report() {
  const [openTable, setOpenTable] = useState(false);
  const [reportByOrderNo, setReportByOrderNo] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [reportByBKNo, setReportByBKNo] = React.useState("");
  const [open2, setOpen2] = React.useState(false);
  const [reportByBrand, setReportByBrand] = React.useState("");
  const [open3, setOpen3] = React.useState(false);

  const handleChange1 = (event) => {
    setReportByOrderNo(event.target.value);
    setOpenTable(true);
  };
  const handleChange2 = (event) => {
    setReportByBKNo(event.target.value);
    setOpenTable(true);
  };
  const handleChange3 = (event) => {
    setReportByBrand(event.target.value);
    setOpenTable(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  return (
    <>
      <Typography
        style={{
          marginTop: "90px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Report by order no
          </InputLabel>
          <Select
            style={{
              borderRadius: "25px",
              height: "54px",
              color: "#505152",
            }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open1}
            onClose={handleClose1}
            onOpen={handleOpen1}
            value={reportByOrderNo}
            label="Report by order no"
            onChange={handleChange1}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>All order</MenuItem>
            <MenuItem value={20}>All customer</MenuItem>
            <MenuItem value={30}>All state</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Report by bk no
          </InputLabel>
          <Select
            style={{
              borderRadius: "25px",
              height: "54px",
              color: "#505152",
            }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open2}
            onClose={handleClose2}
            onOpen={handleOpen2}
            value={reportByBKNo}
            label="Report by bk no"
            onChange={handleChange2}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>All bk</MenuItem>
            <MenuItem value={20}>All customer</MenuItem>
            <MenuItem value={30}>All state</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Report by brand
          </InputLabel>
          <Select
            style={{
              borderRadius: "25px",
              height: "54px",
              color: "#505152",
            }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open3}
            onClose={handleClose3}
            onOpen={handleOpen3}
            value={reportByBrand}
            label="Report by brand"
            onChange={handleChange3}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>All brands</MenuItem>
            <MenuItem value={20}>All customer</MenuItem>
            <MenuItem value={30}>All state</MenuItem>
          </Select>
        </FormControl>
      </Typography>
      <Typography
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "space-evenly",
          marginLeft: "5.124450951683748vw",
          marginRight: "5.124450951683748vw",
        }}
      >
        <Typography>
          {openTable ? (
            <ReportOfTable />
          ) : (
            <Typography style={{ fontFamily: "sans-serif", fontSize: "17px" }}>
              Table report will goes here
            </Typography>
          )}
        </Typography>
      </Typography>
      <Typography
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "13.124450951683748vw",
          marginRight: "13.124450951683748vw",
          marginBottom: "25px",
        }}
      >
        <Typography>
          {openTable ? (
            <>
              <Button
                style={{
                  textTransform: "none",
                  borderRadius: "20px",
                  height: "35px",
                }}
                variant="contained"
                color="primary"
                onClick={() => setOpenTable(false)}
              >
                Clear Report
              </Button>
            </>
          ) : (
            <>
              <Button
                style={{
                  textTransform: "none",
                  borderRadius: "20px",
                  height: "35px",
                }}
                variant="contained"
                color="primary"
                onClick={() => setOpenTable(true)}
              >
                Report
              </Button>
            </>
          )}
        </Typography>
        <Typography>
          <Button
            style={{
              textTransform: "none",
              borderRadius: "20px",
              height: "35px",
            }}
            variant="contained"
            color="primary"
          >
            Export to PDF
          </Button>
          <Button
            style={{
              marginLeft: "10px",
              textTransform: "none",
              borderRadius: "20px",
              height: "35px",
            }}
            variant="contained"
            color="primary"
          >
            Export to excel
          </Button>
        </Typography>
      </Typography>
    </>
  );
}
export default Report;

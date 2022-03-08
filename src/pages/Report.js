import { REQUESTURL } from "../Constants";

import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useEffect } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Autocomplete from "@mui/material/Autocomplete";
import Controls from "../components/controls/Controls";

function createData(ProductName, QNT, cost, total, state, totalsize) {
  return { ProductName, QNT, cost, total, state, totalsize };
}

const rows = [
  createData("Cupcake", 305, 3.7, "$2456", "recived", 0.345),
  createData("Donut", 452, 25.0, "$2456", "cancelld", 0.645),
  createData("Eclair", 262, 16.0, "$2456", "recived", 0.945),
  createData("Frozen yoghurt", 159, 6.0, "$2456", "recived ", 0.245),
  createData("Gingerbread", 356, 16.0, "$2456", "cancelled", 0.645),
  createData("Honeycomb", 408, 3.2, "$2456", "cancelld", 0.545),
  createData("Ice cream sandwich", 237, 9.0, "$2456", "recived", 0.845),
  createData("Jelly Bean", 375, 0.0, "$2456", "cancelld", 0.45),
  createData("KitKat", 518, 26.0, "$2456", "recived ", 0.59),
  createData("Lollipop", 392, 0.2, "$2456", "recived ", 0.145),
  createData("Marshmallow", 318, 0, "$2456", "cancelled", 0.345),
  createData("Nougat", 360, 19.0, "$2456", "cancelled", 0.645),
  createData("Oreo", 437, 18.0, "$2456", "cancelled", 0.745),
].sort((a, b) => (a.QNT < b.QNT ? -1 : 1));

let staticRows = [];
const Root = styled("div")`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

function Report() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [allCustomers, setAllCustomers] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allOrders, setAllOrders] = React.useState([]);
  const [allBkno, setAllBkno] = React.useState([]);

  const [brandAutoComplete, setBrandAutoComplete] = React.useState("");
  const [orderAutoComplete, setOrderAutoComplete] = React.useState("");
  const [customerAutoComplete, setCustomerAutoComplete] = React.useState("");
  const [bknoAutoComplete, setBknoAutoComplete] = React.useState("");

  const [allOrdersData, setAllOrdersData] = React.useState([]);
  const [allItemsData, setAllItemsData] = React.useState([]);
  const [rowsData, setRowsData] = React.useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUESTURL}/api/ItemManipulate/get`,
    }).then((response) => {
      const result = response.data;
      setAllItemsData(result);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/OrderManipulate/get`,
    }).then((response) => {
      const result = response.data;
      console.log(result);

      setAllOrdersData(result);
    });

    axios({
      method: "get",
      url: `${REQUESTURL}/api/AddBrand/get`,
    }).then((response) => {
      const result = response.data;
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].Brand);
      }
      temp.push("All");
      setAllBrands(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getCustomer`,
    }).then((response) => {
      const result = response.data;
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].customer);
      }
      temp.push("All");

      setAllCustomers(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getOrder`,
    }).then((response) => {
      const result = response.data;
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].order);
      }
      temp.push("All");

      setAllOrders(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getBkno`,
    }).then((response) => {
      const result = response.data;
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].bkno);
      }
      temp.push("All");

      setAllBkno(temp);
    });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openTable, setOpenTable] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

  const handleChange1 = (value) => {
    setOpenTable(true);
  };
  const handleChange2 = (value) => {
    setOpenTable(true);
  };
  const handleChange3 = (value) => {
    setOpenTable(true);
  };
  const handleChange4 = (value) => {
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
  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleOpen4 = () => {
    setOpen4(true);
  };

  const handleBrandNameChange = (e, value) => {
    setRowsData([]);
    setBrandAutoComplete(value);
    handleChange3(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
    } else {
      for (let i = 0; i < allItemsData.length; i++) {
        if (allItemsData[i].brand === value) {
          let flagValue = allItemsData[i].productName;
          for (let j = 0; j < allOrdersData.length; j++) {
            if (allOrdersData[j].ProductName === flagValue) {
              temp.push(allOrdersData[j]);
            }
          }
        }
      }
    }
    setRowsData(temp);
  };
  const handleOrderNameChange = (e, value) => {
    setRowsData([]);
    setOrderAutoComplete(value);
    handleChange1(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
    } else {
      for (let i = 0; i < allOrdersData.length; i++) {
        console.log(allOrdersData[i].ordername, "-", value);
        if (allOrdersData[i].ordername === value) {
          temp.push(allOrdersData[i]);
        }
      }
    }
    setRowsData(temp);
  };
  const handleCustomerNameChange = (e, value) => {
    setRowsData([]);
    setCustomerAutoComplete(value);
    handleChange4(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
    } else {
      for (let i = 0; i < allOrdersData.length; i++) {
        if (allOrdersData[i].customer === value) {
          temp.push(allOrdersData[i]);
        }
      }
    }

    setRowsData(temp);
  };
  const handleBknoChange = (e, value) => {
    setRowsData([]);
    setBknoAutoComplete(value);
    handleChange2(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
    } else {
      for (let i = 0; i < allOrdersData.length; i++) {
        if (allOrdersData[i].BKNO === value) {
          temp.push(allOrdersData[i]);
        }
      }
    }
    setRowsData(temp);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 80, 10);
    doc.autoTable({
      theme: "grid",
      columns: [
        { header: "ProductName", dataKey: "ProductName" },
        { header: "QNT", dataKey: "QNT" },
        { header: "cost", dataKey: "cost" },
        { header: "total", dataKey: "total" },
        { header: "state", dataKey: "state" },
        { header: "totalsize", dataKey: "totalsize" },
      ],
      body: rowsData,
    });
    doc.save("table.pdf");
  };
  const downloadXLSX = () => {};

  return (
    <>
      <Typography
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {/* Order name */}
        <Autocomplete
          // disablePortal
          open={open1}
          onClose={handleClose1}
          onOpen={handleOpen1}
          name="Order Name"
          options={allOrders}
          onChange={handleOrderNameChange}
          value={orderAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input
              {...params}
              label="Reports By Order Name"
              name="OrderName"
            />
          )}
        />
        {/* Order name */}

        {/* <FormControl sx={{ m: 1, minWidth: 190 }}>
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
        </FormControl> */}

        {/* bkno */}
        <Autocomplete
          // disablePortal
          open={open2}
          onClose={handleClose2}
          onOpen={handleOpen2}
          name="Reports By Bkno"
          options={allBkno}
          onChange={handleBknoChange}
          value={bknoAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input {...params} label="Reports By Bkno" name="Bkno" />
          )}
        />
        {/* bkno */}

        {/* <FormControl sx={{ m: 1, minWidth: 190 }}>
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
        </FormControl> */}

        {/* Brands */}
        <Autocomplete
          // disablePortal
          name="Brand"
          open={open3}
          onClose={handleClose3}
          onOpen={handleOpen3}
          options={allBrands}
          onChange={handleBrandNameChange}
          value={brandAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input {...params} label="Reports By Brand" name="Brand" />
          )}
        />
        {/* Brands */}
        {/* <FormControl sx={{ m: 1, minWidth: 190 }}>
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
        </FormControl> */}

        {/* Customer */}
        <Autocomplete
          // disablePortal
          open={open4}
          onClose={handleClose4}
          onOpen={handleOpen4}
          name="Customer"
          options={allCustomers}
          onChange={handleCustomerNameChange}
          value={customerAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input
              {...params}
              label="Reports By Customer"
              name="Customer"
            />
          )}
        />
        {/* Customer */}

        {/* <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Report by Customer
          </InputLabel>
          <Select
            style={{
              borderRadius: "25px",
              height: "54px",
              color: "#505152",
            }}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open4}
            onClose={handleClose4}
            onOpen={handleOpen4}
            value={reportByCustomer}
            label="Report by Customer"
            onChange={(event) => {
              setReportByCustomer(event.target.value);
              setOpenTable(true);
              console.log(event.target.value);
              let dummy = [];

              for (let i = 0; i < allData.length; i++) {
                if (allData[i].customer === event.target.value) {
                  dummy.push(allData[i]);
                }
              }
              setRowsData(dummy);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {allCustomers.map((val, index) => {
              return (
                <MenuItem key={index} value={val.customer}>
                  {val.customer}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
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
            // <ReportOfTable />
            <div>
              {" "}
              <Root
                sx={{
                  maxWidth: "100%",
                  width: 1000,
                }}
              >
                <table aria-label="custom pagination table" id="table-to-xls">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>QNT</th>
                      <th>Cost</th>
                      <th>total</th>
                      <th>state</th>
                      <th>total size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rowsPerPage > 0
                      ? rowsData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rowsData
                    ).map((row) => (
                      <tr key={row.ProductName}>
                        <td style={{ width: 350 }}>{row.ProductName}</td>
                        <td style={{ width: 250 }} align="right">
                          {row.QNT}
                        </td>
                        <td style={{ width: 160 }} align="right">
                          {row.cost}
                        </td>
                        <td style={{ width: 160 }} align="right">
                          {row.total}
                        </td>
                        <td style={{ width: 160 }} align="right">
                          {row.state}
                        </td>
                        <td style={{ width: 360 }} align="right">
                          {row.totalsize}
                        </td>
                      </tr>
                    ))}

                    {emptyRows > 0 && (
                      <tr style={{ height: 41 * emptyRows }}>
                        <td colSpan={3} />
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <CustomTablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={6}
                        count={rowsData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        componentsProps={{
                          select: {
                            "aria-label": "rows per page",
                          },
                          actions: {
                            showFirstButton: true,
                            showLastButton: true,
                          },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </tr>
                  </tfoot>
                </table>
              </Root>
            </div>
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
                onClick={() => {
                  setOpenTable(false);
                  setRowsData([]);
                }}
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
                  height: "38px",
                  marginTop: "-15px",
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
              height: "38px",
              marginTop: "-15px",
              marginRight: "4px",
            }}
            variant="contained"
            color="primary"
            onClick={downloadPdf}
          >
            Export to PDF
          </Button>
          {/* <Button
            style={{
              marginLeft: "10px",
              textTransform: "none",
              borderRadius: "20px",
              height: "35px",
            }}
            variant="contained"
            color="primary"
            onClick={downloadXLSX}
          >
            Export to excel
          </Button> */}

          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button btn btn-primary mb-3 rounded-pill h-70"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Export to excel"
          />
        </Typography>
      </Typography>
    </>
  );
}
export default Report;

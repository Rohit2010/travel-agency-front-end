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
  const [total, setTotal] = useState(null);
  const [totalSize, setTotalSize] = useState(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [allCustomers, setAllCustomers] = React.useState([]);
  const [allBrands, setAllBrands] = React.useState([]);
  const [allOrders, setAllOrders] = React.useState([]);
  const [allBkno, setAllBkno] = React.useState([]);
  const [allStates, setAllStates] = React.useState([]);

  const [brandAutoComplete, setBrandAutoComplete] = React.useState("");
  const [orderAutoComplete, setOrderAutoComplete] = React.useState("");
  const [customerAutoComplete, setCustomerAutoComplete] = React.useState("");
  const [bknoAutoComplete, setBknoAutoComplete] = React.useState("");
  const [stateAutoComplete, setStateAutoComplete] = React.useState("");

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
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getState`,
    }).then((response) => {
      const result = response.data;
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].state);
      }
      temp.push("All");

      setAllStates(temp);
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
  const [open5, setOpen5] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

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
  const handleChange5 = (value) => {
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
  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleOpen5 = () => {
    setOpen5(true);
  };

  const handleBrandNameChange = (e, value) => {
    setRowsData([]);
    setInputValue("");
    setBrandAutoComplete(value);
    setCustomerAutoComplete("");
    setBknoAutoComplete("");
    setOrderAutoComplete("");
    setStateAutoComplete("");

    let total = 0;
    let totalsize = 0;

    handleChange3(value);
    let temp = [];
    if (value === "All") {
      for (let i = 0; i < allItemsData.length; i++) {
        let flagValue = allItemsData[i].productName;
        for (let j = 0; j < allOrdersData.length; j++) {
          if (allOrdersData[j].ProductName === flagValue) {
            allOrdersData[j].brand = allItemsData[i].brand;
            temp.push(allOrdersData[j]);
            total = total + allOrdersData[j].total;
            totalsize = totalsize + allOrdersData[j].totalsize;
          }
        }
      }
    } else {
      for (let i = 0; i < allItemsData.length; i++) {
        if (allItemsData[i].brand === value) {
          let flagValue = allItemsData[i].productName;
          for (let j = 0; j < allOrdersData.length; j++) {
            if (allOrdersData[j].ProductName === flagValue) {
              allOrdersData[j].brand = value;
              temp.push(allOrdersData[j]);
              total = total + allOrdersData[j].total;
              totalsize = totalsize + allOrdersData[j].totalsize;
            }
          }
        }
      }
    }

    setRowsData(temp);
    setTotal(total);
    setTotalSize(totalsize);
    setInputValue("brand");
  };
  const handleOrderNameChange = (e, value) => {
    setRowsData([]);
    setInputValue("");
    setOrderAutoComplete(value);
    setBrandAutoComplete("");
    setCustomerAutoComplete("");
    setBknoAutoComplete("");
    setStateAutoComplete("");

    let total = 0;
    let totalsize = 0;

    handleChange1(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
      for (let j = 0; j < allOrdersData.length; j++) {
        total = total + allOrdersData[j].total;
        totalsize = totalsize + allOrdersData[j].totalsize;
      }
    } else {
      for (let i = 0; i < allOrdersData.length; i++) {
        if (allOrdersData[i].ordername === value) {
          temp.push(allOrdersData[i]);
          total = total + allOrdersData[i].total;
          totalsize = totalsize + allOrdersData[i].totalsize;
        }
      }
    }
    // let obj = {
    //   ProductName: "Total",
    //   QNT: "",
    //   cost: "",
    //   total: total,
    //   state: "",
    //   totalsize: totalsize,
    // };
    setRowsData(temp);
    setTotal(total);
    setTotalSize(totalsize);
    setInputValue("ordername");
  };
  const handleCustomerNameChange = (e, value) => {
    setInputValue("");
    setRowsData([]);

    setCustomerAutoComplete(value);
    handleChange4(value);
    let total = 0;
    let totalsize = 0;

    let temp = [];
    let brandAutoComplete2 = brandAutoComplete.includes("All")
      ? ""
      : brandAutoComplete;

    let orderAutoComplete2 = orderAutoComplete.includes("All")
      ? ""
      : orderAutoComplete;

    let bknoAutoComplete2 = bknoAutoComplete.includes("All")
      ? ""
      : bknoAutoComplete;
    let stateAutoComplete2 = stateAutoComplete.includes("All")
      ? ""
      : stateAutoComplete;

    if (value === "All") value = "";

    // brand logic
    if (inputValue === "brand")
      for (let i = 0; i < allItemsData.length; i++) {
        if (allItemsData[i].brand.includes(brandAutoComplete2)) {
          let flagValue = allItemsData[i].productName;
          for (let j = 0; j < allOrdersData.length; j++) {
            if (allOrdersData[j].ProductName.includes(flagValue)) {
              temp.push(allOrdersData[j]);
            }
          }
        }
      }
    else {
      temp = allOrdersData;
    }

    let filteredData = temp;

    temp = [];
    // brand logic

    for (let i = 0; i < filteredData.length - 1; i++) {
      if (
        filteredData[i].ordername.includes(orderAutoComplete2) &&
        filteredData[i].state.includes(stateAutoComplete2) &&
        filteredData[i].customer.includes(value)
      ) {
        if (inputValue === "bkno") {
          if (
            filteredData[i].BKNO &&
            filteredData[i].BKNO.includes(bknoAutoComplete2)
          ) {
            temp.push(filteredData[i]);
            total = total + filteredData[i].total;
            totalsize = totalsize + filteredData[i].totalsize;
          } else if (!filteredData[i].BKNO) {
            temp.push(filteredData[i]);
            total = total + filteredData[i].total;
            totalsize = totalsize + filteredData[i].totalsize;
          }
        } else {
          temp.push(filteredData[i]);
          total = total + filteredData[i].total;
          totalsize = totalsize + filteredData[i].totalsize;
        }
      }
    }
    let obj = {
      ProductName: "Total",
      QNT: "",
      cost: "",
      total: total,
      state: "",
      totalsize: totalsize,
    };

    setRowsData(temp);
    setTotal(total);
    setTotalSize(totalsize);
  };
  const handleStateNameChange = (e, value) => {
    setRowsData([]);
    setInputValue("");
    setStateAutoComplete(value);
    handleChange5(value);
    let total = 0;
    let totalsize = 0;

    let temp = [];
    let brandAutoComplete2 = brandAutoComplete.includes("All")
      ? ""
      : brandAutoComplete;

    let orderAutoComplete2 = orderAutoComplete.includes("All")
      ? ""
      : orderAutoComplete;

    let bknoAutoComplete2 = bknoAutoComplete.includes("All")
      ? ""
      : bknoAutoComplete;

    let customerAutoComplete2 = customerAutoComplete.includes("All")
      ? ""
      : customerAutoComplete;

    if (value === "All") value = "";

    // brand logic
    if (inputValue === "brand")
      for (let i = 0; i < allItemsData.length; i++) {
        if (allItemsData[i].brand.includes(brandAutoComplete2)) {
          let flagValue = allItemsData[i].productName;
          for (let j = 0; j < allOrdersData.length; j++) {
            if (allOrdersData[j].ProductName.includes(flagValue)) {
              temp.push(allOrdersData[j]);
            }
          }
        }
      }
    else {
      temp = allOrdersData;
    }
    let filteredData = temp;

    temp = [];

    // brand logic

    for (let i = 0; i < filteredData.length - 1; i++) {
      // console.log("--", filteredData[i].ordername, orderAutoComplete2);
      // console.log(filteredData[i].customer, customerAutoComplete2);
      // console.log(filteredData[i].state, value, "--");
      if (
        filteredData[i].ordername.includes(orderAutoComplete2) &&
        filteredData[i].customer.includes(customerAutoComplete2) &&
        filteredData[i].state.includes(value)
      ) {
        if (inputValue === "bkno") {
          if (
            filteredData[i].BKNO &&
            filteredData[i].BKNO.includes(bknoAutoComplete2)
          ) {
            temp.push(filteredData[i]);
            total = total + filteredData[i].total;
            totalsize = totalsize + filteredData[i].totalsize;
          } else if (!filteredData[i].BKNO) {
            temp.push(filteredData[i]);
            total = total + filteredData[i].total;
            totalsize = totalsize + filteredData[i].totalsize;
          }
        } else {
          temp.push(filteredData[i]);
          total = total + filteredData[i].total;
          totalsize = totalsize + filteredData[i].totalsize;
        }
      }
    }
    let obj = {
      ProductName: "Total",
      QNT: "",
      cost: "",
      total: total,
      state: "",
      totalsize: totalsize,
    };
    setRowsData(temp);
    setTotal(total);
    setTotalSize(totalsize);
  };
  const handleBknoChange = (e, value) => {
    setRowsData([]);
    setInputValue("");
    setBknoAutoComplete(value);
    setBrandAutoComplete("");
    setCustomerAutoComplete("");
    setOrderAutoComplete("");
    setStateAutoComplete("");
    let total = 0;
    let totalsize = 0;

    handleChange2(value);
    let temp = [];
    if (value === "All") {
      temp = allOrdersData;
      for (let j = 0; j < allOrdersData.length; j++) {
        total = total + allOrdersData[j].total;
        totalsize = totalsize + allOrdersData[j].totalsize;
      }
    } else {
      for (let i = 0; i < allOrdersData.length; i++) {
        if (allOrdersData[i].BKNO === value) {
          temp.push(allOrdersData[i]);
          total = total + allOrdersData[i].total;
          totalsize = totalsize + allOrdersData[i].totalsize;
        }
      }
    }

    setRowsData(temp);
    setTotal(total);
    setTotalSize(totalsize);
    setInputValue("bkno");
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 80, 10);

    let colArray = [
      { header: "ProductName", dataKey: "ProductName" },
      { header: "QNT", dataKey: "QNT" },
      { header: "cost", dataKey: "cost" },
      { header: "total", dataKey: "total" },
      { header: "state", dataKey: "state" },
      { header: "totalsize", dataKey: "totalsize" },
    ];
    // if (inputValue === "brand") {
    //   colArray.push({ header: "Brand", dataKey: "brand" });
    // } else if (inputValue === "customer") {
    //   colArray.push({ header: "Customer", dataKey: "customer" });
    // } else if (inputValue === "bkno") {
    //   colArray.push({ header: "BKNO", dataKey: "BKNO" });
    // } else if (inputValue === "ordername") {
    //   colArray.push({ header: "Order Name", dataKey: "ordername" });
    // }
    let obj = {
      ProductName: "Total",
      QNT: "",
      cost: "",
      total: total,
      state: "",
      totalsize: totalSize,
    };
    let temp = rowsData;
    temp.push(obj);
    setRowsData(temp);
    doc.autoTable({
      theme: "grid",
      columns: colArray,
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

        {/* bkno */}
        <Autocomplete
          open={open2}
          onClose={handleClose2}
          onOpen={handleOpen2}
          name="Bkno"
          options={allBkno}
          onChange={handleBknoChange}
          value={bknoAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input {...params} label="Reports By Bkno" name="Bkno" />
          )}
        />
        {/* bkno */}

        {/* Brands */}
        <Autocomplete
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
      </Typography>
      <Typography
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Autocomplete
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
        <Autocomplete
          open={open5}
          onClose={handleClose5}
          onOpen={handleOpen5}
          name="State"
          options={allStates}
          onChange={handleStateNameChange}
          value={stateAutoComplete}
          sx={{ width: 215 }}
          renderInput={(params) => (
            <Controls.Input {...params} label="Reports By State" name="State" />
          )}
        />
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
                      {/* {inputValue === "brand" && <th>Brand</th>}
                      {inputValue === "ordername" && <th>Order Name</th>}
                      {inputValue === "customer" && <th>Customer</th>}
                      {inputValue === "bkno" && <th>BKNO</th>} */}

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
                      <tr key={row._id}>
                        {/* {inputValue === "brand" && (
                          <td style={{ width: 360 }} align="right">
                            {row.brand}
                          </td>
                        )}
                        {inputValue === "ordername" && (
                          <td style={{ width: 360 }} align="right">
                            {row.ordername}
                          </td>
                        )}
                        {inputValue === "bkno" && (
                          <td style={{ width: 360 }} align="right">
                            {row.BKNO}
                          </td>
                        )}
                        {inputValue === "customer" && (
                          <td style={{ width: 360 }} align="right">
                            {row.customer}
                          </td>
                        )} */}

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
                      <td style={{ width: 350, fontWeight: "bold" }}>Total</td>
                      <td style={{ width: 250 }} align="right"></td>
                      <td style={{ width: 160 }} align="right"></td>
                      <td
                        style={{ width: 160, fontWeight: "bold" }}
                        align="right"
                      >
                        {total}
                      </td>
                      <td style={{ width: 160 }} align="right"></td>
                      <td
                        style={{ width: 360, fontWeight: "bold" }}
                        align="right"
                      >
                        {totalSize}
                      </td>
                    </tr>
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

import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";
import OrderForm from "../components/OrderForm";
import OrderTabel from "../components/OrderTabel";
import Customer from "../components/formcontrols/Customer";
import Order from "../components/formcontrols/Order";
import Controls from "../components/controls/Controls";
import readXlsxFile from "read-excel-file";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Bkno from "../components/formcontrols/Bkno";
import State from "../components/formcontrols/State";
import { REQUESTURL } from "../Constants";
import OrderUpdateForm from "../components/OrderUpdateForm";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactExport from "react-export-excel";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import Loader from "../components/Loader";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
function OrderPage() {
  const [loader, setLoader] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [updateRowData, setUpdateRowData] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);

  const [rowsData, setRowsData] = React.useState([]);
  const [orderDataFromFile, setOrderDataFromFile] = useState([]);

  const handleDeletedRows = () => {
    if (selectedRows) {
      setLoader(true);
      axios({
        method: "post",
        url: `${REQUESTURL}/api/OrderManipulate/deleterows`,
        data: {
          rows: selectedRows,
        },
      }).then((response) => {
        setLoader(false);
        if (response.data.status === "ok") {
          setSelectedRows([]);
          toast.success("Item Deleted", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.reload();
        }
      });
    }
  };

  const onFileHandling = (e) => {
    const tempData = [];
    readXlsxFile(e.target.files[0]).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        if (rows[i]) tempData.push(rows[i]);
      }
      setOrderDataFromFile(tempData);
    });
  };
  const submitExcelOrders = (e) => {
    setLoader(true);
    axios({
      method: "post",
      url: `${REQUESTURL}/api/OrderManipulate/postexcel`,
      data: {
        excelData: orderDataFromFile,
      },
    })
      .then((response) => {
        setLoader(false);
        console.log(response);
        toast.success("Item inserted", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      })
      .catch((err) => {
        toast.success("Not Inserted", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.reload();
      });
  };
  const handleUpdateRow = () => {
    if (selectedRows.length == 1) {
      setUpdatePopup(true);
    }
  };
  const downloadPdf = () => {
    // const doc = new jsPDF("l", "pt");
    // doc.text("Order Report");
    const doc = new jsPDF("l", "mm", [200, 380]);

    let colArray = [
      { header: "ProductName", dataKey: "ProductName" },
      { header: "QNT", dataKey: "QNT" },
      { header: "cost", dataKey: "cost" },
      { header: "total", dataKey: "total" },
      { header: "customer", dataKey: "customer" },
      { header: "date", dataKey: "date" },
      { header: "ordername", dataKey: "ordername" },
      { header: "state", dataKey: "state" },
      { header: "availabilityDate", dataKey: "availabilityDate" },
      { header: "deliveryDate", dataKey: "deliveryDate" },
      { header: "partno", dataKey: "partno" },
      { header: "totalsize", dataKey: "totalsize" },
      { header: "BKNO", dataKey: "BKNO" },
      { header: "TotalBoxes", dataKey: "TotalBoxes" },
      { header: "Notes", dataKey: "Notes" },
    ];
    // doc.text("Order Report", 80, 10);

    doc.autoTable({
      theme: "grid",
      columns: colArray,
      body: rowsData,
    });
    doc.save("table.pdf");
  };
  return (
    <>
      {loader && <Loader />}
      <Typography
        style={{
          marginTop: "110px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {/* Table code will be here in this div */}
        <Typography
          style={{
            marginLeft: "12vw",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography
            style={{ fontWeight: "bold", fontSize: "25px", color: "#505152" }}
          >
            Orders Collection
          </Typography>
        </Typography>

        <Typography style={{ marginRight: "30px", marginLeft: "20px" }}>
          <Button
            text="Add New"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpenPopup(true);
            }}
            style={{ width: "150px", marginRight: "20px" }}
          >
            Add order
          </Button>
          <Button
            text="Delete Rows"
            variant="outlined"
            color="primary"
            // startIcon={<AddIcon />}
            onClick={() => {
              handleDeletedRows();
            }}
            style={{ width: "150px" }}
          >
            Delete Rows
          </Button>
          <Button
            text="Update Row"
            variant="outlined"
            color="primary"
            // startIcon={<AddIcon />}
            onClick={() => {
              handleUpdateRow();
            }}
            style={{ width: "150px" }}
          >
            Update Row
          </Button>

          <Controls.Input
            variant="standard"
            type="file"
            name="excel"
            onChange={onFileHandling}
            style={{
              marginRight: "5px",
              marginTop: "4px",
            }}
          />

          <Button
            text="Upload"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={submitExcelOrders}
            style={{ width: "150px" }}
          >
            Upload
          </Button>
          <Typography
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                textTransform: "none",
                borderRadius: "20px",
                height: "38px",
                marginTop: "-15px",
                marginRight: "40px",
              }}
              variant="contained"
              color="primary"
              onClick={downloadPdf}
            >
              Export to PDF
            </Button>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-primary mb-3 rounded-pill h-70"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Export to excel"
            />
            <table
              aria-label="custom pagination table"
              id="table-to-xls"
              style={{ display: "none" }}
            >
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>QNT</th>
                  <th>Cost</th>
                  <th>total</th>
                  <th>customer</th>
                  <th>date</th>
                  <th>ordername</th>
                  <th>state</th>
                  <th>availabilityDate</th>
                  <th>deliveryDate</th>
                  <th>partno</th>
                  <th>totalsize</th>
                  <th>BKNO</th>
                  <th>TotalBoxes</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {rowsData.map((row) => (
                  <tr key={row._id}>
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
                      {row.customer}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.date}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.ordername}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.state}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.availabilityDate}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.deliveryDate}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.partno}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.totalsize}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.BKNO}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.TotalBoxes}
                    </td>

                    <td style={{ width: 160 }} align="right">
                      {row.Notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Typography>
        </Typography>
      </Typography>
      <Typography style={{ margin: "20px" }}>
        <OrderTabel
          setSelectedRows={setSelectedRows}
          setUpdateRowData={setUpdateRowData}
          selectedRows={selectedRows}
          setRowsData={setRowsData}
        />
      </Typography>

      <Popup
        title="Enter your Order Specfication"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <OrderForm />
      </Popup>
      <Popup
        title="Enter your Item Specfication"
        openPopup={updatePopup}
        setOpenPopup={setUpdatePopup}
      >
        <OrderUpdateForm updateRowData={updateRowData} />
      </Popup>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export default OrderPage;

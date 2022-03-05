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

function OrderPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);

  const [orderDataFromFile, setOrderDataFromFile] = useState([]);

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
    for (let i = 0; i < orderDataFromFile; i++) {}

    axios({
      method: "post",
      url: "http://localhost:8800/api/OrderManipulate/postexcel",
      data: {
        excelData: orderDataFromFile,
      },
    }).then((response) => {
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
    });
  };

  return (
    <>
      <Typography
        style={{
          marginTop: "110px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Table code will be here in this div */}
        <Typography
          style={{
            marginLeft: "42vw",
            display: "flex",
            justifyContent: "center",
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
            style={{ width: "150px" }}
          >
            Add order
          </Button>

          <Controls.Input
            type="file"
            name="excel"
            onChange={onFileHandling}
            style={{ border: "1px solid blue" }}
          />

          <Button
            text="Upload"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={submitExcelOrders}
            style={{ width: "250px" }}
          >
            Upload
          </Button>
        </Typography>
      </Typography>
      <Typography style={{ margin: "20px" }}>
        <OrderTabel />
      </Typography>
      <Popup
        title="Enter your Order Specfication"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <OrderForm />
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

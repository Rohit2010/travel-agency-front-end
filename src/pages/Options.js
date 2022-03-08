import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import Button from "../components/controls/Button";
import Brand from "../components/formcontrols/Brand";
import Popup from "../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import Customer from "../components/formcontrols/Customer";
import Bkno from "../components/formcontrols/Bkno";
import State from "../components/formcontrols/State";
import { ToastContainer } from "react-toastify";
import Order from "../components/formcontrols/Order";

function Options() {
  const [brandPopup, setBrandPopup] = useState(false);
  const [customerPoppup, setCustomerPoppup] = useState(false);
  const [bknoPopup, setBknoPopup] = useState(false);
  const [statePopup, setStatePopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);

  return (
    <Typography
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        style={{
          height: "80%",
          marginTop: "85px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button
          text="Add Brand"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setBrandPopup(true);
          }}
          style={{ width: "250px" }}
        >
          Add Brand
        </Button>
        <Button
          text="Add Customer"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setCustomerPoppup(true);
          }}
          style={{ width: "250px" }}
        >
          Add Customer
        </Button>
        <Button
          text="Add Order"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setOrderPopup(true);
          }}
          style={{ width: "250px" }}
        >
          Add Order Name
        </Button>
        <Button
          text="Add Bkno"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setBknoPopup(true);
          }}
          style={{ width: "250px" }}
        >
          Add Bkno
        </Button>
        <Button
          text="Add State"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setStatePopup(true);
          }}
          style={{ width: "250px" }}
        >
          Add State
        </Button>
        <Popup
          title="Enter Order Name"
          openPopup={orderPopup}
          setOpenPopup={setOrderPopup}
        >
          <Order />
        </Popup>
        <Popup
          title="Enter your Customer Name"
          openPopup={customerPoppup}
          setOpenPopup={setCustomerPoppup}
        >
          <Customer />
        </Popup>
        <Popup
          title="Enter Bkno"
          openPopup={bknoPopup}
          setOpenPopup={setBknoPopup}
        >
          <Bkno />
        </Popup>
        <Popup
          title="Enter State"
          openPopup={statePopup}
          setOpenPopup={setStatePopup}
        >
          <State />
        </Popup>
        <Popup
          title="Enter Brand"
          openPopup={brandPopup}
          setOpenPopup={setBrandPopup}
        >
          <Brand />
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
      </Typography>
    </Typography>
  );
}

export default Options;

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

function OrderPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [customerPoppup, setCustomerPoppup] = useState(false);
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
      <Popup
        title="Enter your Customer Name"
        openPopup={customerPoppup}
        setOpenPopup={setCustomerPoppup}
      >
        <Customer />
      </Popup>
      <Popup
        title="Enter Order Name"
        openPopup={orderPopup}
        setOpenPopup={setOrderPopup}
      >
        <Order />
      </Popup>
    </>
  );
}
export default OrderPage;

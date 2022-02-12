import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";
import ItemForm from "../components/ItemForm";
import ItemTabel from "../components/ItemTabel";
import Brand from "../components/formcontrols/Brand";

function ItemsPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [brandPopup, setBrandPopup] = useState(false);
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
            Items Collection
          </Typography>
        </Typography>
        <Typography
          // style={{ float: "right", marginTop: "-20px", marginRight: "5px" }}
          style={{ marginRight: "10px", marginLeft: "10px" }}
        >
          <Button
            text="Add New Brand"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setBrandPopup(true);
            }}
            style={{ width: "150px" }}
          >
            Add Brand
          </Button>

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
            Add item
          </Button>
        </Typography>
      </Typography>
      <Typography style={{ margin: "20px" }}>
        <ItemTabel />
      </Typography>
      <Popup
        title="Enter your Item Specfication"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ItemForm />
      </Popup>
      <Popup
        title="Enter Brand"
        openPopup={brandPopup}
        setOpenPopup={setBrandPopup}
      >
        <Brand />
      </Popup>
    </>
  );
}
export default ItemsPage;

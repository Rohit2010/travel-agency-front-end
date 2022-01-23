import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../components/Popup";
import ItemForm from "../components/ItemForm";
import ItemTabel from "../components/ItemTabel";

function ItemsPage() {
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <Typography
        style={{
          marginTop: "110px",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {/* Table code will be here in this div */}
        <Typography style={{ marginLeft: "30px" }}>
          <ItemTabel />
        </Typography>

        <Typography
          // style={{ float: "right", marginTop: "-20px", marginRight: "5px" }}
          style={{ marginRight: "30px", marginLeft: "20px" }}
        >
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
      <Popup
        title="Enter your Item specfication"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ItemForm />
      </Popup>
    </>
  );
}
export default ItemsPage;

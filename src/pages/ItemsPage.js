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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UpdateForm from "../components/UpdateForm";
import { REQUESTURL } from "../Constants";
import readXlsxFile from "read-excel-file";
import Controls from "../components/controls/Controls";

const validateObject = (obj) => {
  if (
    obj.productName &&
    obj.brand &&
    obj.tradeName &&
    // obj.pcsInbox &&
    // obj.minimumOrder &&
    // obj.cost &&
    // obj.long &&
    // obj.width &&
    // obj.height &&
    // obj.boxSize &&
    !isNaN(obj.boxSize) &&
    !isNaN(obj.height) &&
    !isNaN(obj.width) &&
    !isNaN(obj.long) &&
    !isNaN(obj.cost) &&
    !isNaN(obj.minimumOrder) &&
    !isNaN(obj.pcsInbox)
  ) {
    return true;
  }
  console.log(obj, "rejected");
  return false;
};
function ItemsPage() {
  const [openPopup, setOpenPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [updateRowData, setUpdateRowData] = React.useState([]);

  const [orderDataFromFile, setOrderDataFromFile] = useState([]);
  const onFileHandling = (e) => {
    const tempData = [];
    readXlsxFile(e.target.files[0]).then((rows) => {
      for (let i = 1; i < rows.length; i++) {
        let obj = {
          brand: rows[i][0],
          productName: rows[i][1],
          productDescription: rows[i][2],
          tradeName: rows[i][3],
          pcsInbox: rows[i][4],
          minimumOrder: rows[i][5],
          cost: rows[i][6],
          long: rows[i][7],
          width: rows[i][8],
          height: rows[i][9],
          boxSize: rows[i][10],
        };
        if (validateObject(obj)) {
          if (rows[i]) tempData.push(obj);
        }
      }
      setOrderDataFromFile(tempData);
    });
  };
  const submitExcelOrders = (e) => {
    axios({
      method: "post",
      url: `${REQUESTURL}/api/ItemManipulate/postexcel`,
      data: {
        excelData: orderDataFromFile,
      },
    })
      .then((response) => {
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
        toast.error("Duplicate values/Server Error", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // window.location.reload();
      });
  };
  const handleDeletedRows = () => {
    if (selectedRows) {
      axios({
        method: "post",
        url: `${REQUESTURL}/api/GetProductNames/deleterows`,
        data: {
          rows: selectedRows,
        },
      }).then((response) => {
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
  const handleUpdateRow = () => {
    if (selectedRows.length == 1) {
      setUpdatePopup(true);
    }
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
            Items Collection
          </Typography>
        </Typography>
        <Typography
          // style={{ float: "right", marginTop: "-20px", marginRight: "5px" }}
          style={{ marginRight: "10px", marginLeft: "10px" }}
        >
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
        <ItemTabel
          setSelectedRows={setSelectedRows}
          setUpdateRowData={setUpdateRowData}
          selectedRows={selectedRows}
        />
      </Typography>
      <Popup
        title="Enter your Item Specfication"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ItemForm />
      </Popup>
      <Popup
        title="Enter your Item Specfication"
        openPopup={updatePopup}
        setOpenPopup={setUpdatePopup}
      >
        <UpdateForm updateRowData={updateRowData} />
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
export default ItemsPage;

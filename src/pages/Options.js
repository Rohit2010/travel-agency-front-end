import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
// import Button from "../components/controls/Button";
import Brand from "../components/formcontrols/Brand";
import Popup from "../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import Customer from "../components/formcontrols/Customer";
import Bkno from "../components/formcontrols/Bkno";
import State from "../components/formcontrols/State";
import { toast, ToastContainer } from "react-toastify";
import Order from "../components/formcontrols/Order";
import { Box } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { REQUESTURL } from "../Constants";
import Button from "@material-ui/core/Button";

import axios from "axios";

const brandColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 95,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "Brand",
    headerName: "Brand",
    width: 130,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const customerColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 95,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 190,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const bknoColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 95,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "bkno",
    headerName: "BKNO",
    width: 150,
    headerClassName: "super-app-theme--header",
  },
];
const stateColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 95,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "state",
    headerName: "State",
    width: 190,
    headerClassName: "super-app-theme--header",
  },
];
const orderColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 95,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "order",
    headerName: "Order Name",
    width: 170,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];

function Options() {
  const [brandPopup, setBrandPopup] = useState(false);
  const [customerPoppup, setCustomerPoppup] = useState(false);
  const [bknoPopup, setBknoPopup] = useState(false);
  const [statePopup, setStatePopup] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  // checks
  const [brandCheck, setBrandCheck] = useState(false);
  // checks

  // dataRows
  const [brandData, setBrandData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [bknoData, setBknoData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  // dataRows

  // selectionRows
  const [brandSelection, setBrandSelection] = useState([]);
  const [customerSelection, setCustomerSelection] = useState([]);
  const [bknoSelection, setBknoSelection] = useState([]);
  const [stateSelection, setStateSelection] = useState([]);
  const [orderSelection, setOrderSelection] = useState([]);
  // selectionRows

  // refs
  const brandRef = useRef();
  const customerRef = useRef();
  const bknoRef = useRef();
  const stateRef = useRef();
  const orderRef = useRef();
  // refs

  // SelectionChange
  const onBrandSelectionChanges = (rows) => {
    setBrandSelection(rows);
  };
  const onCustomerSelectionChanges = (rows) => {
    setCustomerSelection(rows);
  };
  const onBknoSelectionChanges = (rows) => {
    setBknoSelection(rows);
  };
  const onStateSelectionChanges = (rows) => {
    setStateSelection(rows);
  };
  const onOrderSelectionChanges = (rows) => {
    setOrderSelection(rows);
  };
  // SelectionChange

  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUESTURL}/api/AddBrand/get`,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].id = response.data[i]._id;
      }
      setBrandData(response.data);
    });

    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getCustomer`,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].id = response.data[i]._id;
      }
      setCustomerData(response.data);
    });

    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getOrder`,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].id = response.data[i]._id;
      }
      setOrderData(response.data);
    });

    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getBkno`,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].id = response.data[i]._id;
      }
      setBknoData(response.data);
    });

    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getState`,
    }).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i].id = response.data[i]._id;
      }
      setStateData(response.data);
    });
  }, [
    brandSelection,
    customerSelection,
    orderSelection,
    stateSelection,
    bknoSelection,
    brandPopup,
    customerPoppup,
    orderPopup,
    statePopup,
    bknoPopup,
  ]);

  // Deletion Handling
  const handleDeletedRows = (rows, path) => {
    if (rows) {
      axios({
        method: "post",
        url: `${REQUESTURL}/api/Delete/${path}`,
        data: {
          rows: rows,
        },
      }).then((response) => {
        if (response.data.status === "ok") {
          toast.success("Item Deleted", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (path === "brand") setBrandSelection([]);
          else if (path === "customer") setCustomerSelection([]);
          else if (path === "bkno") setBknoSelection([]);
          else if (path === "state") setStateSelection([]);
          else if (path === "order") setOrderSelection([]);

          // window.location.reload();
        }
      });
    }
  };
  // Deletion Handling

  return (
    <Typography
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        style={{
          marginTop: "85px",
          display: "flex",
          justifyContent: "space-between",
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
          <Order setOrderPopup={setOrderPopup} />
        </Popup>
        <Popup
          title="Enter your Customer Name"
          openPopup={customerPoppup}
          setOpenPopup={setCustomerPoppup}
        >
          <Customer setCustomerPoppup={setCustomerPoppup} />
        </Popup>
        <Popup
          title="Enter Bkno"
          openPopup={bknoPopup}
          setOpenPopup={setBknoPopup}
        >
          <Bkno setBknoPopup={setBknoPopup} />
        </Popup>
        <Popup
          title="Enter State"
          openPopup={statePopup}
          setOpenPopup={setStatePopup}
        >
          <State setStatePopup={setStatePopup} />
        </Popup>
        <Popup
          title="Enter Brand"
          openPopup={brandPopup}
          setOpenPopup={setBrandPopup}
        >
          <Brand setBrandPopup={setBrandPopup} />
        </Popup>
      </Typography>

      <Typography
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{}}>
          <Box
            sx={{
              height: "470px",
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .super-app-theme--header": {
                fontWeight: "900!important",
              },
            }}
          >
            <Button
              text="Delete Brand"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeletedRows(brandSelection, "brand");
              }}
              style={{ width: "150px", marginBottom: "10px" }}
            >
              Delete Brand
            </Button>
            <DataGrid
              ref={brandRef}
              rows={brandData}
              columns={brandColumns}
              pageSize={6}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onBrandSelectionChanges}
            />
          </Box>
        </Typography>
        <Typography style={{}}>
          <Box
            sx={{
              height: "470px",
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .super-app-theme--header": {
                fontWeight: "900!important",
              },
            }}
          >
            <Button
              text="Delete Customer"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeletedRows(customerSelection, "customer");
              }}
              style={{ width: "180px", marginBottom: "10px" }}
            >
              Delete Customer
            </Button>
            <DataGrid
              ref={customerRef}
              rows={customerData}
              columns={customerColumns}
              pageSize={6}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onCustomerSelectionChanges}
            />
          </Box>
        </Typography>
        <Typography style={{}}>
          <Box
            sx={{
              height: "470px",
              width: "270px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .super-app-theme--header": {
                fontWeight: "900!important",
              },
            }}
          >
            <Button
              text="Delete Order"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeletedRows(orderSelection, "order");
              }}
              style={{ width: "150px", marginBottom: "10px" }}
            >
              Delete Order
            </Button>
            <DataGrid
              ref={orderRef}
              rows={orderData}
              columns={orderColumns}
              pageSize={6}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onOrderSelectionChanges}
            />
          </Box>
        </Typography>
        <Typography style={{}}>
          <Box
            sx={{
              height: "470px",
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .super-app-theme--header": {
                fontWeight: "900!important",
              },
            }}
          >
            <Button
              text="Delete BKNO"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeletedRows(bknoSelection, "bkno");
              }}
              style={{ width: "180px", marginBottom: "10px" }}
            >
              Delete BKNO
            </Button>
            <DataGrid
              ref={bknoRef}
              rows={bknoData}
              columns={bknoColumns}
              pageSize={6}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onBknoSelectionChanges}
            />
          </Box>
        </Typography>
        <Typography style={{}}>
          <Box
            sx={{
              height: "470px",
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              "& .super-app-theme--header": {
                fontWeight: "900!important",
              },
            }}
          >
            <Button
              text="Delete State"
              variant="outlined"
              color="primary"
              onClick={() => {
                handleDeletedRows(stateSelection, "state");
              }}
              style={{ width: "180px", marginBottom: "10px" }}
            >
              Delete State
            </Button>
            <DataGrid
              ref={stateRef}
              rows={stateData}
              columns={stateColumns}
              pageSize={6}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onStateSelectionChanges}
            />
          </Box>
        </Typography>
      </Typography>
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
  );
}

export default Options;

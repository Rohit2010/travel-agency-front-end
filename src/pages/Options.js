import { Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
// import Button from "../components/controls/Button";
import Brand from "../components/formcontrols/Brand";
import Popup from "../components/Popup";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
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
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 95,
  //   headerClassName: "super-app-theme--header",
  // },
  {
    field: "Brand",
    headerName: "Brand",
    width: 130,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const customerColumns = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 95,
  //   headerClassName: "super-app-theme--header",
  // },
  {
    field: "customer",
    headerName: "Customer",
    width: 190,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const bknoColumns = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 95,
  //   headerClassName: "super-app-theme--header",
  // },
  {
    field: "bkno",
    headerName: "BKNO",
    width: 150,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const stateColumns = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 95,
  //   headerClassName: "super-app-theme--header",
  // },
  {
    field: "state",
    headerName: "State",
    width: 190,
    editable: true,
    headerClassName: "super-app-theme--header",
  },
];
const orderColumns = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   width: 95,
  //   headerClassName: "super-app-theme--header",
  // },
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

  // updateData
  const [updateBrandData, setUpdateBrandData] = useState([]);
  const [updateCustomerData, setUpdateCustomerData] = useState([]);
  const [updateBknoData, setUpdateBknoData] = useState([]);
  const [updateStateData, setUpdateStateData] = useState([]);
  const [updateOrderData, setUpdateOrderData] = useState([]);
  // updateData

  // update popups
  const [updateBrandPopup, setUpdateBrandPopup] = useState(false);
  const [updateCustomerPoppup, setUpdateCustomerPoppup] = useState(false);
  const [updateBknoPopup, setUpdateBknoPopup] = useState(false);
  const [updateStatePopup, setUpdateStatePopup] = useState(false);
  const [updateOrderPopup, setUpdateOrderPopup] = useState(false);

  const [newUpdatedValues, setNewUpdatedValues] = useState({});
  // update popups

  // helping function
  function handleUpdateValues(rows, allData, setUpdateData) {
    if (rows.length === 1) {
      let data = allData;
      if (data) {
        for (let index = 0; index < data.length; index++) {
          if (data[index].id === rows[0]) {
            setUpdateData(data[index]);
            break;
          }
        }
      }
    }
  }
  // helping function

  // SelectionChange
  const onBrandSelectionChanges = (rows) => {
    setBrandSelection(rows);
    handleUpdateValues(rows, brandData, setUpdateBrandData);
  };
  const onCustomerSelectionChanges = (rows) => {
    setCustomerSelection(rows);
    handleUpdateValues(rows, customerData, setUpdateCustomerData);
  };
  const onBknoSelectionChanges = (rows) => {
    setBknoSelection(rows);
    handleUpdateValues(rows, bknoData, setUpdateBknoData);
  };
  const onStateSelectionChanges = (rows) => {
    setStateSelection(rows);
    handleUpdateValues(rows, stateData, setUpdateStateData);
  };
  const onOrderSelectionChanges = (rows) => {
    setOrderSelection(rows);
    handleUpdateValues(rows, orderData, setUpdateOrderData);
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
    if (rows.length > 0) {
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

  // Request for updata
  function requestForUpdate(id, pre, newvalue, path) {
    axios({
      method: "post",
      url: `${REQUESTURL}/api/update/${path}`,
      data: {
        id: id,
        pre: pre,
        new: newvalue,
      },
    }).then((response) => {
      if (response.data.status === "ok") {
        toast.success("Data Updated", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Something Went Wrong", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }
  // Request for updata

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
            <Typography
              style={{
                display: "flex",
                gap: "5px",
                marginBottom: "5px",
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
                style={{ width: "70px" }}
              ></Button>
              <Button
                text="Delete Brand"
                variant="outlined"
                color="primary"
                startIcon={<RemoveIcon />}
                style={{ width: "70px" }}
                onClick={() => {
                  handleDeletedRows(brandSelection, "brand");
                }}
              ></Button>
            </Typography>

            <DataGrid
              ref={brandRef}
              rows={brandData}
              columns={brandColumns}
              pageSize={brandData.length}
              autoPageSize={false}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onBrandSelectionChanges}
              onEditRowsModelChange={(rows) => {
                let keyName = Object.keys(rows)[0];
                if (keyName) {
                  setNewUpdatedValues({
                    ...newUpdatedValues,
                    [keyName]: rows[keyName].Brand.value,
                  });
                } else {
                  let id = Object.keys(newUpdatedValues)[0];
                  let previousValue = "";
                  for (let i = 0; i < brandData.length; i++) {
                    if (brandData[i].id === id) {
                      previousValue = brandData[i].Brand;
                      break;
                    }
                  }
                  let newValue = newUpdatedValues[id];
                  if (previousValue !== newValue)
                    requestForUpdate(id, previousValue, newValue, "brand");
                  setNewUpdatedValues({});
                }
              }}
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
            {" "}
            <Typography
              style={{
                display: "flex",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                text="Add Customer"
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setCustomerPoppup(true);
                }}
                style={{ width: "70px" }}
              ></Button>
              <Button
                text="Delete Customer"
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleDeletedRows(customerSelection, "customer");
                }}
                startIcon={<RemoveIcon />}
                style={{ width: "70px" }}
              ></Button>
            </Typography>
            <DataGrid
              ref={customerRef}
              rows={customerData}
              columns={customerColumns}
              pageSize={customerData.length}
              autoPageSize={false}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onCustomerSelectionChanges}
              onEditRowsModelChange={(rows) => {
                let keyName = Object.keys(rows)[0];
                if (keyName) {
                  setNewUpdatedValues({
                    ...newUpdatedValues,
                    [keyName]: rows[keyName].customer.value,
                  });
                } else {
                  let id = Object.keys(newUpdatedValues)[0];
                  let previousValue = "";
                  for (let i = 0; i < customerData.length; i++) {
                    if (customerData[i].id === id) {
                      previousValue = customerData[i].customer;
                      break;
                    }
                  }
                  let newValue = newUpdatedValues[id];
                  if (previousValue !== newValue)
                    requestForUpdate(id, previousValue, newValue, "customer");
                  setNewUpdatedValues({});
                }
              }}
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
            <Typography
              style={{
                display: "flex",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                text="Add Order"
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setOrderPopup(true);
                }}
                style={{ width: "70px" }}
              ></Button>
              <Button
                text="Delete Order"
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleDeletedRows(orderSelection, "order");
                }}
                startIcon={<RemoveIcon />}
                style={{ width: "70px" }}
              ></Button>
            </Typography>
            <DataGrid
              ref={orderRef}
              rows={orderData}
              columns={orderColumns}
              pageSize={orderData.length}
              autoPageSize={false}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onOrderSelectionChanges}
              onEditRowsModelChange={(rows) => {
                let keyName = Object.keys(rows)[0];
                if (keyName) {
                  setNewUpdatedValues({
                    ...newUpdatedValues,
                    [keyName]: rows[keyName].order.value,
                  });
                } else {
                  let id = Object.keys(newUpdatedValues)[0];
                  let previousValue = "";
                  for (let i = 0; i < orderData.length; i++) {
                    if (orderData[i].id === id) {
                      previousValue = orderData[i].order;
                      break;
                    }
                  }
                  let newValue = newUpdatedValues[id];
                  if (previousValue !== newValue)
                    requestForUpdate(id, previousValue, newValue, "order");
                  setNewUpdatedValues({});
                }
              }}
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
            <Typography
              style={{
                display: "flex",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                text="Add Bkno"
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setBknoPopup(true);
                }}
                style={{ width: "70px" }}
              ></Button>
              <Button
                text="Delete BKNO"
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleDeletedRows(bknoSelection, "bkno");
                }}
                startIcon={<RemoveIcon />}
                style={{ width: "70px" }}
              ></Button>
            </Typography>
            <DataGrid
              ref={bknoRef}
              rows={bknoData}
              columns={bknoColumns}
              pageSize={bknoData.length}
              autoPageSize={false}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onBknoSelectionChanges}
              onEditRowsModelChange={(rows) => {
                let keyName = Object.keys(rows)[0];
                if (keyName) {
                  setNewUpdatedValues({
                    ...newUpdatedValues,
                    [keyName]: rows[keyName].bkno.value,
                  });
                } else {
                  let id = Object.keys(newUpdatedValues)[0];
                  let previousValue = "";
                  for (let i = 0; i < bknoData.length; i++) {
                    if (bknoData[i].id === id) {
                      previousValue = bknoData[i].bkno;
                      break;
                    }
                  }
                  let newValue = newUpdatedValues[id];
                  if (previousValue !== newValue)
                    requestForUpdate(id, previousValue, newValue, "bkno");
                  setNewUpdatedValues({});
                }
              }}
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
            <Typography
              style={{
                display: "flex",
                gap: "5px",
                marginBottom: "5px",
              }}
            >
              <Button
                text="Add State"
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setStatePopup(true);
                }}
                style={{ width: "70px" }}
              ></Button>
              <Button
                text="Delete State"
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleDeletedRows(stateSelection, "state");
                }}
                startIcon={<RemoveIcon />}
                style={{ width: "70px" }}
              ></Button>
            </Typography>
            <DataGrid
              ref={stateRef}
              rows={stateData}
              columns={stateColumns}
              pageSize={stateData.length}
              autoPageSize={false}
              checkboxSelection
              disableSelectionOnClick
              onSelectionModelChange={onStateSelectionChanges}
              onEditRowsModelChange={(rows) => {
                let keyName = Object.keys(rows)[0];
                if (keyName) {
                  setNewUpdatedValues({
                    ...newUpdatedValues,
                    [keyName]: rows[keyName].state.value,
                  });
                } else {
                  let id = Object.keys(newUpdatedValues)[0];
                  let previousValue = "";
                  for (let i = 0; i < stateData.length; i++) {
                    if (stateData[i].id === id) {
                      previousValue = stateData[i].state;
                      break;
                    }
                  }
                  let newValue = newUpdatedValues[id];
                  if (previousValue !== newValue)
                    requestForUpdate(id, previousValue, newValue, "state");
                  setNewUpdatedValues({});
                }
              }}
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

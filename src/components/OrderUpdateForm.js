import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import Autocomplete from "@mui/material/Autocomplete";

import "react-toastify/dist/ReactToastify.css";
import "date-fns";
// import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import axios from "axios";
import { REQUESTURL } from "../Constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderUpdateForm(props) {
  const initialFValues = {
    id: props.updateRowData.id,
    QNT: props.updateRowData.QNT,
    total: props.updateRowData.total,
    cost: props.updateRowData.cost,
    partno: props.updateRowData.partno,
    TotalSize: props.updateRowData.totalsize,
    Totalboxes: props.updateRowData.TotalBoxes,
    Notes: props.updateRowData.Notes,
  };

  const [productNameData, setProductNameData] = React.useState([]);
  const [orderNameData, setOrderNameData] = React.useState([]);
  const [customerNameData, setCustomerNameData] = React.useState([]);
  const [bknoData, setBknoData] = React.useState([]);
  const [stateData, setStateData] = React.useState([]);

  const [costValueForProduct, setCostValueForProduct] = React.useState(
    props.updateRowData.cost
  );
  const [pcsinboxForProduct, setPcsinboxForProduct] = React.useState();
  const [boxSizeForProduct, setBoxSizeForProduct] = React.useState();

  const [onlyProducts, setOnlyProducts] = React.useState([]);
  const [productNameAutoComplete, setProductNameAutoComplete] = React.useState(
    props.updateRowData.ProductName
  );
  const [productNameCheck, setProductNameCheck] = React.useState(true);

  const [onlyCustomers, setOnlyCustomers] = React.useState([]);
  const [customerNameAutoComplete, setCustomerNameAutoComplete] =
    React.useState(props.updateRowData.customer);
  const [customerNameCheck, setCustomerNameCheck] = React.useState(true);

  const [onlyOrders, setOnlyOrders] = React.useState([]);
  const [orderNameAutoComplete, setOrderNameAutoComplete] = React.useState(
    props.updateRowData.ordername
  );
  const [orderNameCheck, setOrderNameCheck] = React.useState(true);

  const [onlyStates, setOnlyStates] = React.useState([]);
  const [stateNameAutoComplete, setStateNameAutoComplete] = React.useState(
    props.updateRowData.state
  );
  const [stateNameCheck, setStateNameCheck] = React.useState(true);

  const [onlybkno, setOnlybkno] = React.useState([]);
  const [bknoAutoComplete, setBknoAutoComplete] = React.useState(
    props.updateRowData.BKNO
  );
  const [bknoCheck, setBknoCheck] = React.useState(true);

  const [lock, setLock] = useState(false);

  function settingCostToProduct(value) {
    axios({
      method: "post",
      url: `${REQUESTURL}/api/GetProductNames/getvaluesforproduct`,
      data: {
        productName: value,
      },
    }).then((response) => {
      // console.log(response.data);
      if (response.data.cost) setCostValueForProduct(response.data.cost);
      setPcsinboxForProduct(response.data.pcsInbox);
      setBoxSizeForProduct(response.data.boxSize);
    });
  }
  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/get`,
    }).then((response) => {
      setProductNameData(response.data);
      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].productName);
      }
      setOnlyProducts(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getCustomer`,
    }).then((response) => {
      setCustomerNameData(response.data);

      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].customer);
      }
      setOnlyCustomers(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getOrder`,
    }).then((response) => {
      setOrderNameData(response.data);

      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].order);
      }
      setOnlyOrders(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getBkno`,
    }).then((response) => {
      setBknoData(response.data);

      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].bkno);
      }
      setOnlybkno(temp);
    });
    axios({
      method: "get",
      url: `${REQUESTURL}/api/GetProductNames/getState`,
    }).then((response) => {
      setStateData(response.data);
      console.log(response.data, "yess");

      let temp = [];
      for (let index = 0; index < response.data.length; index++) {
        temp.push(response.data[index].state);
      }
      setOnlyStates(temp);
    });
    // setBknoCheck(false);
    // setStateNameCheck(false);
    // setOrderNameCheck(false);
    // setCustomerNameCheck(false);
    // setProductNameCheck(false);
  }, []);

  const handleProductNameChange = (event, value) => {
    if (value) {
      setProductNameCheck(true);
      settingCostToProduct(value);
      setErrors({ ...errors, cost: "" });
    } else {
      setProductNameCheck(false);
      setCostValueForProduct("");
    }
    setProductNameAutoComplete(value);
  };
  const handleCustomerNameChange = (event, value) => {
    if (value) {
      setCustomerNameCheck(true);
    } else {
      setCustomerNameCheck(false);
    }
    setCustomerNameAutoComplete(value);
  };
  const handleOrderNameChange = (event, value) => {
    if (value) {
      setOrderNameCheck(true);
    } else {
      setOrderNameCheck(false);
    }
    setOrderNameAutoComplete(value);
  };
  const handleStateNameChange = (event, value) => {
    if (value) {
      setStateNameCheck(true);
    } else {
      setStateNameCheck(false);
    }
    setStateNameAutoComplete(value);
  };
  const handleBknoChange = (event, value) => {
    // if (value) {
    //   setBknoCheck(true);
    // } else {
    //   setBknoCheck(false);
    // }
    setBknoAutoComplete(value);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    props.updateRowData.date
  );
  const [availabilityDate, setAvailabilityDate] = React.useState(
    props.updateRowData.availabilityDate
  );
  const [deliveryDate, setDeliveryDate] = React.useState(
    props.updateRowData.deliveryDate
  );

  const [dateFlag, setDateFlag] = React.useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("ProductName" in fieldValues)
      temp.ProductName = fieldValues.ProductName
        ? ""
        : "This field is required.";
    if ("QNT" in fieldValues)
      temp.QNT = fieldValues.QNT ? "" : "This field is required.";
    if ("total" in fieldValues)
      temp.total = fieldValues.total ? "" : "This field is required.";
    if ("TotalSize" in fieldValues)
      temp.TotalSize = fieldValues.TotalSize ? "" : "This field is required.";
    if ("OrderName" in fieldValues)
      temp.OrderName = fieldValues.OrderName ? "" : "This field is required.";
    if ("Customer" in fieldValues)
      temp.Customer = fieldValues.Customer ? "" : "This field is required.";
    if ("state" in fieldValues)
      temp.state = fieldValues.state ? "" : "This field is required.";
    if ("cost" in fieldValues)
      temp.cost = fieldValues.cost ? "" : "This field is required.";
    if ("Notes" in fieldValues) temp.Notes = fieldValues.Notes;
    // if ("partno" in fieldValues)
    //   temp.partno = fieldValues.partno ? "" : "This field is required.";
    if ("Totalboxes" in fieldValues)
      temp.Totalboxes = fieldValues.Totalboxes ? "" : "This field is required.";
    if ("bkno" in fieldValues)
      temp.bkno = fieldValues.bkno ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (!productNameAutoComplete) {
      setProductNameCheck(false);
    }

    if (
      productNameAutoComplete &&
      fieldValues.QNT &&
      fieldValues.total &&
      fieldValues.TotalSize &&
      orderNameAutoComplete &&
      stateNameAutoComplete &&
      fieldValues.cost &&
      // fieldValues.partno &&
      fieldValues.Totalboxes &&
      // bknoAutoComplete && //bkno filed change to not required
      customerNameAutoComplete &&
      selectedDate
      // availabilityDate &&
      // deliveryDate
    ) {
      if (availabilityDate >= selectedDate && deliveryDate >= selectedDate) {
      }
      return true;

      // if (fieldValues == values)
      //   return Object.values(temp).every((x) => x == "");
    }

    return false;
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  if (costValueForProduct) {
    values.cost = costValueForProduct;
  } else {
    values.cost = "";
  }
  if (values.QNT && costValueForProduct) {
    values.total = values.QNT * costValueForProduct;
  }
  if (pcsinboxForProduct) {
    if (values.QNT) {
      values.Totalboxes = values.QNT / pcsinboxForProduct;
    }
  }
  if (boxSizeForProduct) {
    if (values.QNT) {
      values.TotalSize = values.QNT * boxSizeForProduct;
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lock) {
      if (!customerNameAutoComplete) {
        setCustomerNameCheck(false);
      }
      if (!orderNameAutoComplete) {
        setOrderNameCheck(false);
      }

      if (!stateNameAutoComplete) {
        setStateNameCheck(false);
      }
      if (validate()) {
        setLock(true);
        console.log("sending the data");
        if (!values.Notes) values.Notes = "";

        axios({
          method: "post",
          url: `${REQUESTURL}/api/OrderManipulate/update`,
          data: {
            id: values.id,
            productName: productNameAutoComplete,
            QNT: values.QNT,
            cost: values.cost,
            total: values.total,
            customer: customerNameAutoComplete,
            Date: selectedDate,
            orderName: orderNameAutoComplete,
            state: stateNameAutoComplete,
            availabilityDate: availabilityDate,
            deliveryDate: deliveryDate,
            partNo: values.partno,
            totalSize: values.TotalSize,
            BK_NO: bknoAutoComplete,
            totalBoxes: values.Totalboxes,
            notes: values.Notes,
          },
        }).then((response) => {
          setLock(false);
          if (response.data.status === "not ok") {
            toast.error(response.data.errmsg, {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Item inserted", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setValues(initialFValues);
            window.location.reload();
          }
        });
      } else
        toast.error("Incorrect Date Inputs / Some Fields are empty", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } else {
    }
  };

  return (
    <Form style={{ marginLeft: "50px" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Autocomplete
            // disablePortal
            name="Product Name"
            options={onlyProducts}
            onChange={handleProductNameChange}
            value={productNameAutoComplete}
            sx={{ width: 415 }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Product Name"
                name="Product Name"
                error={productNameCheck ? "" : "This field is required"}
              />
            )}
          />

          <Controls.Input
            type="Number"
            label="QNT"
            name="QNT"
            value={values.QNT}
            onChange={(e) => {
              handleInputChange(e);
              if (e.target.value && productNameAutoComplete) {
                setErrors({
                  ...errors,
                  ["total"]: "",
                  ["TotalSize"]: "",
                  ["Totalboxes"]: "",
                  ["QNT"]: "",
                });
              } else {
                // setErrors({
                //   ...errors,
                //   total: "This field is required",
                //   TotalSize: "This field is required",
                //   Totalboxes: "This field is required",
                //   QNT: "This field is required",
                // });
                setValues({
                  ...values,
                  total: "",
                  TotalSize: "",
                  Totalboxes: "",
                  QNT: "",
                });
              }
            }}
            error={errors.QNT}
          />
          <Controls.Input
            type="Number"
            label="total"
            name="total"
            value={values.total}
            onChange={handleInputChange}
            error={errors.total}
          />

          <Autocomplete
            // disablePortal
            name="Customer"
            options={onlyCustomers}
            onChange={handleCustomerNameChange}
            value={customerNameAutoComplete}
            sx={{ width: 415 }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Customer"
                name="Customer"
                error={!customerNameCheck ? "This field is required" : ""}
              />
            )}
          />

          <Autocomplete
            // disablePortal
            name="Order"
            options={onlyOrders}
            onChange={handleOrderNameChange}
            value={orderNameAutoComplete}
            sx={{ width: 415 }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Order"
                name="Order"
                error={!orderNameCheck ? "This field is required" : ""}
              />
            )}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                // required="true"
                style={{ marginRight: "68px" }}
                margin="normal"
                id="date-picker-dialog"
                label="Pick current date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          <Autocomplete
            // disablePortal
            name="State"
            options={onlyStates}
            onChange={handleStateNameChange}
            value={stateNameAutoComplete}
            sx={{ width: 415 }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="state"
                name="state"
                error={!stateNameCheck ? "This field is required" : ""}
              />
            )}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                // required="true"
                style={{ marginRight: "68px" }}
                margin="normal"
                id="date-picker-dialog"
                label="availability Date"
                format="MM/dd/yyyy"
                value={availabilityDate}
                onChange={(date) => {
                  setAvailabilityDate(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            type="Number"
            label="cost"
            name="cost"
            value={values.cost}
            onChange={handleInputChange}
            error={errors.cost}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                // required="true"
                style={{ marginRight: "68px" }}
                margin="normal"
                id="date-picker-dialog"
                label="delivery Date"
                format="MM/dd/yyyy"
                value={deliveryDate}
                onChange={(date) => {
                  setDeliveryDate(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Controls.Input
            type="Number"
            label="Total Size"
            name="TotalSize"
            value={values.TotalSize}
            onChange={handleInputChange}
            error={errors.TotalSize}
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Part No
            </InputLabel>
            <Select
              native
              name="partno"
              value={values.partno}
              onChange={handleInputChange}
              label="state"
              error={errors.partno}
            >
              <option value={0} defaultValue={0}>
                0
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5 </option>
              <option value={6}>6 </option>
              <option value={7}>7 </option>
              <option value={8}>8 </option>
              <option value={9}>9 </option>
              <option value={10}>10 </option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>23</option>
              <option value={14}>14</option>
              <option value={15}>15 </option>
              <option value={16}>16 </option>
              <option value={17}>17 </option>
              <option value={18}>18 </option>
              <option value={19}>19 </option>
              <option value={20}>20 </option>
            </Select>
          </FormControl>

          <Controls.Input
            type="Number"
            label="Total boxes"
            name="Totalboxes"
            value={values.Totalboxes}
            onChange={handleInputChange}
            error={errors.Totalboxes}
          />
          <Autocomplete
            // disablePortal
            name="Bkno"
            options={onlybkno}
            onChange={handleBknoChange}
            value={bknoAutoComplete}
            sx={{ width: 415 }}
            renderInput={(params) => (
              <Controls.Input
                {...params}
                label="Bkno"
                name="Bkno"
                error={!bknoCheck ? "This field is required" : ""}
              />
            )}
          />

          <Controls.Input
            label="Notes"
            name="Notes"
            value={values.Notes}
            onChange={handleInputChange}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Controls.Button type="submit" text="Save" />
            <Controls.Button
              text="Reset"
              color="default"
              onClick={() => {
                setCostValueForProduct(props.updateRowData.cost);
                resetForm();
                setProductNameAutoComplete(props.updateRowData.ProductName);
                setCustomerNameAutoComplete(props.updateRowData.customer);
                setOrderNameAutoComplete(props.updateRowData.ordername);
                setStateNameAutoComplete(props.updateRowData.state);
                setBknoAutoComplete(props.updateRowData.BKNO);
                setSelectedDate(props.updateRowData.date);
                setAvailabilityDate(props.updateRowData.availabilityDate);
                setDeliveryDate(props.updateRowData.deliveryDate);
                setProductNameCheck(true);
                setCustomerNameCheck(true);
                setOrderNameCheck(true);
                setStateNameCheck(true);
                setBknoCheck(true);
              }}
            />
          </div>
        </Grid>
      </Grid>
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
    </Form>
  );
}

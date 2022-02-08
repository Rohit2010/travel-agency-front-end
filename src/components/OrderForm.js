import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import "date-fns";
// import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const initialFValues = {
  id: 0,
  ProductName: "",
  QNT: "",
  total: "",
  OrderName: "",
  state: "",
  cost: "",
  partno: "",
  TotalSize: "",
  bkno: "",
  Notes: "",
};

export default function OrderForm(props) {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

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
    if ("state" in fieldValues)
      temp.state = fieldValues.state ? "" : "This field is required.";
    if ("cost" in fieldValues)
      temp.cost = fieldValues.cost ? "" : "This field is required.";
    if ("Notes" in fieldValues) temp.Notes = fieldValues.Notes;
    if ("partno" in fieldValues)
      temp.partno = fieldValues.partno ? "" : "This field is required.";
    if ("Totalboxes" in fieldValues) temp.Totalboxes = fieldValues.Totalboxes;
    if ("bkno" in fieldValues) temp.bkno = fieldValues.bkno;
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form is validated");
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };

  return (
    <Form style={{ marginLeft: "50px" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Product Name
            </InputLabel>
            <Select
              native
              name="ProductName"
              value={values.ProductName}
              onChange={handleInputChange}
              label="Product Name"
              error={errors.ProductName}
            >
              <option aria-label="None" value="" />
              <option value={10}>Zellbury</option>
              <option value={20}>Khaadi</option>
              <option value={30}>Generation</option>
              <option value={40}>Limelight</option>
            </Select>
          </FormControl>

          <Controls.Input
            type="Number"
            label="QNT"
            name="QNT"
            value={values.QNT}
            onChange={handleInputChange}
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

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Customer
            </InputLabel>
            <Select
              native
              name="Customer"
              value={values.Customer}
              onChange={handleInputChange}
              label="Customer"
              error={errors.ProductName}
            >
              <option aria-label="None" value="" />
              <option value={10}>customer1</option>
              <option value={20}>customer2</option>
              <option value={30}>customer3</option>
              <option value={40}>customer3</option>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Select Order Name
            </InputLabel>
            <Select
              native
              name="OrderName"
              value={values.OrderName}
              onChange={handleInputChange}
              label="Order Name"
              error={errors.OrderName}
            >
              <option aria-label="None" value="" />
              <option value={10}>order name1</option>
              <option value={20}>order name2</option>
              <option value={30}>order name3</option>
              <option value={40}>order name4</option>
            </Select>
          </FormControl>

          {/* <Controls.Input
            label="Order Name"
            name="OrderName"
            value={values.OrderName}
            onChange={handleInputChange}
            error={errors.OrderName}
          /> */}

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                required="true"
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">state</InputLabel>
            <Select
              native
              name="state"
              value={values.state}
              onChange={handleInputChange}
              label="state"
              error={errors.state}
            >
              <option aria-label="None" value="" />
              <option value={10}>Pending</option>
              <option value={20}>Available</option>
              <option value={30}>Shipping</option>
              <option value={40}>Received</option>
              <option value={50}>Canceled </option>
              <option value={60}>Delayed </option>
              <option value={70}>Archived </option>
            </Select>
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                required="true"
                style={{ marginRight: "68px" }}
                margin="normal"
                id="date-picker-dialog"
                label="availability Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
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
                required="true"
                style={{ marginRight: "68px" }}
                margin="normal"
                id="date-picker-dialog"
                label="delivery Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
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
              <option aria-label="None" value="" />
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
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">BK NO</InputLabel>
            <Select
              native
              name="bkno"
              value={values.bkno}
              onChange={handleInputChange}
              label="bkno"
            >
              <option aria-label="None" value="" />
              <option value={1}>BK NO1</option>
              <option value={2}>BK NO2</option>
              <option value={3}>BK NO3</option>
              <option value={4}>BK NO3</option>
              <option value={5}>BK NO4 </option>
              <option value={6}>BK NO5 </option>
            </Select>
          </FormControl>
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
            <Controls.Button
              // type="submit"
              text="Save"
              onClick={() => {
                console.log("form is submitted through button");
              }}
            />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

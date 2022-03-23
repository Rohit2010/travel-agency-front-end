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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function UpdateForm(props) {
  console.log(props, "props");
  const initialFValues = {
    id: props.updateRowData.id,
    Brand: props.updateRowData.Brand,
    ProductName: props.updateRowData.ProductName,
    Productdescription: props.updateRowData.description,
    pcsinbox: props.updateRowData.pcsinbox,
    TradeName: props.updateRowData.TradeName,
    minimumorder: props.updateRowData.minimumOrder,
    cost: props.updateRowData.cost,
    Long: props.updateRowData.Long,
    Width: props.updateRowData.Width,
    Height: props.updateRowData.Height,
    boxsize: props.updateRowData.boxsize,
    gender: "male",
  };
  const classes = useStyles();
  const [brandData, setBrandData] = React.useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `${REQUESTURL}/api/AddBrand/get`,
    }).then((response) => {
      console.log(response.data);
      setBrandData(response.data);
    });
  }, []);

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
    if ("Brand" in fieldValues)
      temp.Brand = fieldValues.Brand ? "" : "This field is required.";
    if ("ProductName" in fieldValues)
      temp.ProductName = fieldValues.ProductName
        ? ""
        : "This field is required.";
    if ("Productdescription" in fieldValues)
      temp.Productdescription = fieldValues.Productdescription;
    if ("pcsinbox" in fieldValues)
      temp.pcsinbox = fieldValues.pcsinbox ? "" : "This field is required.";
    if ("TradeName" in fieldValues)
      temp.TradeName = fieldValues.TradeName ? "" : "This field is required.";
    if ("minimumorder" in fieldValues)
      temp.minimumorder = fieldValues.minimumorder
        ? ""
        : "This field is required.";
    if ("cost" in fieldValues)
      temp.cost = fieldValues.cost ? "" : "This field is required.";
    if ("Long" in fieldValues)
      temp.Long = fieldValues.Long ? "" : "This field is required.";
    if ("Width" in fieldValues)
      temp.Width = fieldValues.Width ? "" : "This field is required.";
    if ("Height" in fieldValues)
      temp.Height = fieldValues.Height ? "" : "This field is required.";

    if ("boxsize" in fieldValues)
      temp.boxsize = fieldValues.boxsize ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (
      fieldValues.Brand &&
      fieldValues.ProductName &&
      fieldValues.pcsinbox &&
      fieldValues.TradeName &&
      fieldValues.minimumorder &&
      fieldValues.cost &&
      fieldValues.Long &&
      fieldValues.Width &&
      fieldValues.Height &&
      fieldValues.boxsize
    ) {
      return true;
      // return Object.values(temp).every((x) => x == "");
    }
    return false;
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  let tempvalue = 0;
  if (values.Height && values.Long && values.Width && values.pcsinbox) {
    tempvalue = values.Height * values.Long * values.Width;
    tempvalue = tempvalue / values.pcsinbox;
    values.boxsize = tempvalue / 1000000;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // addOrEdit(values, resetForm);
      if (!values.Productdescription) {
        values.Productdescription = "";
      }
      console.log(values);
      axios({
        method: "post",
        url: `${REQUESTURL}/api/ItemManipulate/update`,
        data: {
          id: values.id,
          brand: values.Brand,
          productName: values.ProductName,
          productDescription: values.Productdescription,
          tradeName: values.TradeName,
          pcsInbox: values.pcsinbox,
          minimumOrder: values.minimumorder,
          cost: values.cost,
          long: values.Long,
          width: values.Width,
          height: values.Height,
          boxSize: values.boxsize,
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
    }
  };

  return (
    <Form style={{ marginLeft: "50px" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">Brand</InputLabel>
            <Select
              native
              name="Brand"
              value={values.Brand}
              onChange={handleInputChange}
              label="Brand"
              error={errors.Brand}
            >
              <option aria-label="None" value="" />
              {brandData.map((val, index) => {
                return (
                  <option value={val.Brand} key={val._id}>
                    {val.Brand}
                  </option>
                );
              })}
              {/* <option value={"Zellbury"}>Zellbury</option>
              <option value={"Khaadi"}>Khaadi</option>
              <option value={"Generation"}>Generation</option>
              <option value={"Limelight"}>Limelight</option> */}
            </Select>
          </FormControl>

          <Controls.Input
            // required
            label="Product Name"
            name="ProductName"
            value={values.ProductName}
            onChange={(e) => {
              handleInputChange(e);
            }}
            error={errors.ProductName}
          />
          <Controls.Input
            // required
            label="Product description"
            name="Productdescription"
            value={values.Productdescription}
            onChange={handleInputChange}
            // error={errors.Productdescription}
          />

          <Controls.Input
            label="pcs inbox"
            type="Number"
            name="pcsinbox"
            value={values.pcsinbox}
            onChange={(e) => {
              handleInputChange(e);
            }}
            error={errors.pcsinbox}
          />
          <Controls.Input
            label="Trade Name"
            name="TradeName"
            value={values.TradeName}
            onChange={handleInputChange}
            error={errors.TradeName}
          />
          <Controls.Input
            type="Number"
            label="minimum order"
            name="minimumorder"
            value={values.minimumorder}
            onChange={handleInputChange}
            error={errors.minimumorder}
          />
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
          <Controls.Input
            type="Number"
            label="Long"
            name="Long"
            value={values.Long}
            onChange={(e) => {
              handleInputChange(e);
            }}
            error={errors.Long}
          />
          <Controls.Input
            type="Number"
            label="Width"
            name="Width"
            value={values.Width}
            onChange={(e) => {
              handleInputChange(e);
            }}
            error={errors.Width}
          />
          <Controls.Input
            type="Number"
            label="Height"
            name="Height"
            value={values.Height}
            onChange={(e) => {
              handleInputChange(e);
            }}
            error={errors.Height}
          />
          <Controls.Input
            type="Float"
            label="box size(M)"
            name="boxsize"
            value={values.boxsize}
            onChange={handleInputChange}
            error={errors.boxsize}
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
                resetForm();
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

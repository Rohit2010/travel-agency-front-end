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
  Brand: "",
  ProductName: "",
  Productdescription: "",
  pcsinbox: "",
  TradeName: "",
  minimumorder: "",
  cost: "",
  Long: "",
  Width: "",
  Height: "",
  boxsize: "",
  gender: "male",
};

export default function ItemForm(props) {
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
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
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
              <option value={10}>Zellbury</option>
              <option value={20}>Khaadi</option>
              <option value={30}>Generation</option>
              <option value={40}>Limelight</option>
            </Select>
          </FormControl>

          <Controls.Input
            // required
            label="Product Name"
            name="ProductName"
            value={values.ProductName}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            error={errors.Long}
          />
          <Controls.Input
            type="Number"
            label="Width"
            name="Width"
            value={values.Width}
            onChange={handleInputChange}
            error={errors.Width}
          />
          <Controls.Input
            type="Number"
            label="Height"
            name="Height"
            value={values.Height}
            onChange={handleInputChange}
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
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}

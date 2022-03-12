import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import { useForm, Form } from "../useForm";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { REQUESTURL } from "../../Constants";
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
  order: "",
};

export default function Order(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });
  const handleinputChange = (e) => {};

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  //   const { addOrEdit, recordForEdit } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("order" in fieldValues)
      temp.order = fieldValues.order ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues.order) {
      return true;
      // return Object.values(temp).every((x) => x == "");
    }
    return false;
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // addOrEdit(values, resetForm);

      axios({
        method: "post",
        url: `${REQUESTURL}/api/GetProductNames/addOrder`,
        data: {
          order: values.order,
        },
      }).then((response) => {
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
          props.setOrderPopup(false);
          // window.location.reload();
        }
      });
    }
  };

  return (
    <Form style={{ marginLeft: "50px" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            // required
            label="Order Name"
            name="order"
            value={values.order}
            onChange={handleInputChange}
            error={errors.order}
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

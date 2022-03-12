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

const initialFValues = {
  id: 0,
  bkno: "",
};

export default function Bkno(props) {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("bkno" in fieldValues)
      temp.bkno = fieldValues.bkno ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues.bkno) {
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
        url: `${REQUESTURL}/api/GetProductNames/addBkno`,
        data: {
          bkno: values.bkno,
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
          props.setBknoPopup(false);
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
            label="Bkno"
            name="bkno"
            value={values.bkno}
            onChange={handleInputChange}
            error={errors.bkno}
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

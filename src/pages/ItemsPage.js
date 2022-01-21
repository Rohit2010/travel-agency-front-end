import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function ItemsPage() {
  const classes = useStyles();
  return (
    <>
      <Typography
        style={{
          marginTop: "110px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
          Enter your Item Specfication
        </Typography>
      </Typography>
      <br />

      <Typography style={{ display: "flex", justifyContent: "center" }}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              required
              id="standard-required"
              label="Brand"
              variant="filled"
            />
            <TextField
              id="standard-required"
              label="Product Name"
              variant="filled"
            />
            <TextField
              id="standard-required"
              label="Product description"
              variant="filled"
            />
            <TextField
              required
              id="standard-required"
              label="Trade Name"
              variant="filled"
            />
            <TextField
              type="number"
              inputMode="numeric"
              required
              id="standard-required"
              label="pcs inbox"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              type="number"
              inputMode="numeric"
              required
              id="standard-required"
              label="minimum order"
              variant="filled"
            />
            <TextField
              type="number"
              inputMode="numeric"
              required
              id="standard-required"
              label="Long"
              variant="filled"
            />
            <TextField
              type="number"
              inputMode="numeric"
              required
              id="standard-required"
              label="Width"
              variant="filled"
            />
            <TextField
              type="number"
              inputMode="numeric"
              required
              id="standard-required"
              label="Height"
              variant="filled"
            />
            <TextField
              type="float"
              inputMode="numeric"
              required
              id="standard-required"
              label="box size (M)"
              variant="filled"
              defaultValue="345.023"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </form>
      </Typography>
    </>
  );
}
export default ItemsPage;

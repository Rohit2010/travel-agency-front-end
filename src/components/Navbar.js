import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar style={{ position: "fixed", left: "0px", right: "0px" }}>
      <CssBaseline />
      <Toolbar>
        {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}> */}
        <Typography style={{ fontSize: "31px" }} className={classes.logo}>
          Selling Network
        </Typography>
        {/* </Link> */}
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/ItemsPage" className={classes.link}>
              Items
            </Link>
            <Link to="/OrderPage" className={classes.link}>
              Order
            </Link>
            <Link to="/Report" className={classes.link}>
              Report
            </Link>
            <Link to="/Options" className={classes.link}>
              Options
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

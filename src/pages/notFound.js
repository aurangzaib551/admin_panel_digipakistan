import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: "#01645f",
    transition: "all .3s",
    fontFamily: "Quicksand, sans-serif",
    outline: "none !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "#02a39b",
    },
  },
}));

const NotFound404 = () => {
  const classes = useStyles();

  //   Object Destructuring
  const { push } = useHistory();

  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <h1 className="display-4 text-center">404 &middot; Page not found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Button
          onClick={() =>
            setTimeout(() => {
              push("/");
            }, 400)
          }
          variant="contained"
          className={classes.button}
        >
          Go to Home Page
        </Button>
      </div>
    </>
  );
};

export default NotFound404;

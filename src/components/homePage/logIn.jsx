import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <Container className="mt-5">
      <Box className="d-flex justify-content-center">
        <Paper elevation={5} className="p-3">
          <Box className="d-flex justify-content-center">
            <img
              src="https://i.ibb.co/LYC7rpt/logoPNG.png"
              alt="DigiPAKISTAN"
              width="200"
            />
          </Box>
          <Typography variant="h4" className="family text-center fw-bold">
            Log In
          </Typography>
          <form className="mt-3">
            <TextField
              variant="filled"
              id="email"
              label="Email Address"
              fullWidth
            />
            <TextField
              className="mt-3"
              variant="filled"
              id="password"
              type="password"
              label="Password"
              fullWidth
            />
            <Button
              variant="contained"
              className="mui-btn-contained mt-3"
              fullWidth
            >
              Log In
            </Button>
          </form>
          <Box className="d-flex justify-content-center mt-3">
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/" className="text-decoration-none">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LogIn;

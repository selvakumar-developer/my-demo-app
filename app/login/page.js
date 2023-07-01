"use client";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignInSide() {
  const [snack, setSnack] = React.useState({
    open: false,
    color: "",
    message: "",
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  const router = useRouter();

  const handleSubmit = async (values) => {
    if (values.email === "admin@gmail.com" && values.password === "admin123") {
      router.push("/admin");
    } else if (acceptedFiles.length !== 0) {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      const convertedFile = await fileToBase64(acceptedFiles[0]);
      formData.append("file", convertedFile);

      axios
        .post("http://localhost:3000/api/user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.status === 200) {
            setSnack({
              open: true,
              color: "success",
              message: "Saved successfully",
            });
          } else {
            setSnack({
              open: true,
              color: "error",
              message: "Email Id already taken",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setSnack({
            open: true,
            color: "error",
            message: "Something went wrong",
          });
        });
    } else {
      setSnack({
        open: true,
        color: "error",
        message: "Please upload image",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleSnackClose = () => {
    setSnack({
      open: false,
      color: "",
      message: "",
    });
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <Typography color="textSecondary" fontWeight={"bold"} mt={1}>
        {file.path} - {file.size} bytes
      </Typography>
    </li>
  ));

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://i.pinimg.com/564x/b1/9a/6e/b19a6ea910e8f6d9cb8058a136e507b2.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <section className="container border-dashed border-2 h-40 mt-2 flex justify-center items-center">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button variant="text" startIcon={<UploadFileIcon />}>
                      Drag And Drop Or Upload File
                    </Button>
                  </div>
                </section>
                <ul>{files}</ul>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  type="submit"
                >
                  Sign In
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snack.color}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

import * as Yup from "yup";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Username is required!"),
  newPassword: Yup.string().required("Password is required!"),
  retypedNewPassword: Yup.string().required("Password is required!"),
});

const UserForm = ({ submitHandler }) => {
  const { handleSubmit, handleChange, isValidating, values, touched, errors } =
    useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        retypedNewPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: submitHandler,
    });

  return (
    <Paper sx={{ p: 2, maxWidth: "20rem" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }} component="form" onSubmit={ handleSubmit }>
        <TextField
          sx={{mt: 0}}
          fullWidth
          size="small"
          margin="dense"
          name="oldPassword"
          type="password"
          label="Old Password"
          value={ values.oldPassword }
          onChange={ handleChange }
          error={ Boolean(touched.oldPassword && errors.oldPassword) }
          helperText={ touched.oldPassword && errors.oldPassword }
        />
        <TextField
          fullWidth
          size="small"
          margin="dense"
          name="newPassword"
          type="password"
          label="New password"
          value={ values.newPassword }
          onChange={ handleChange }
          error={ Boolean(touched.newPassword && errors.newPassword) }
          helperText={ touched.newPassword && errors.newPassword }
        />
        <TextField
          fullWidth
          size="small"
          margin="dense"
          name="retypedNewPassword"
          type="password"
          label="Retype new password"
          value={ values.retypedNewPassword }
          onChange={ handleChange }
          error={ Boolean(touched.retypedNewPassword && errors.retypedNewPassword) }
          helperText={ touched.retypedNewPassword && errors.retypedNewPassword }
        />
        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          color="success"
          size="small"
          type="submit"
          disabled={ isValidating }
        >
          SUBMIT
        </Button>
      </Box>
    </Paper>
  );
};

export default UserForm;

import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "../Link";

const validationSchema = Yup.object({
  channelName: Yup.string().required("Name is required!"),
  inputUrl: Yup.string().required("Input Url is required!"),
  inputLatency: Yup.number()
    .min(20, "Minimal latency is 20")
    .max(6000, "Maximum latency is 6000"),
  inputPassword: Yup.string()
    .min(10, "Password length must be not less then 10 characters")
    .max(79, "Password length can't be greater then 79 characters"),
  outputUrl: Yup.string().required("Output Url is required!"),
  outputLatency: Yup.number()
    .min(20, "Minimal latency is 20")
    .max(6000, "Maximum latency is 6000")
});

const ChannelForm = ({ channel, formTitle, submitHandler }) => {
  const { handleSubmit, handleChange, values, touched, errors, isValidating } =
    useFormik({
      initialValues: {
        channelName: channel?.channelName || "",
        inputUrl: channel?.inputUrl || "",
        inputMode: channel?.inputMode || "caller",
        inputLatency: channel?.inputLatency || 120,
        inputPassword: channel?.inputPassword || "",
        outputUrl: channel?.outputUrl || "",
        outputMode: channel?.outputMode || "caller",
        outputLatency: channel?.outputLatency || 120,
        outputPassword: channel?.outputPassword || "",
        enabled: channel?.enabled || false,
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: submitHandler,
    });

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography component="div" variant="h4" textAlign="center">
        { formTitle }
      </Typography>
      <TextField
        name="channelName"
        label="Channel Name:"
        margin="normal"
        size="small"
        fullWidth
        value={ values.channelName }
        onChange={ handleChange }
        error={ Boolean(touched.channelName && errors.channelName) }
        helperText={ touched.channelName && errors.channelName }
      />
      <Box component="form" onSubmit={ handleSubmit }>
        <TextField
          name="inputUrl"
          label="Input Url:"
          placeholder="udp://ip:port, srt://ip:port"
          margin="dense"
          size="small"
          fullWidth
          value={ values.inputUrl }
          onChange={ handleChange }
          error={ Boolean(touched.inputUrl && errors.inputUrl) }
          helperText={ touched.inputUrl && errors.inputUrl }
        />
        <Box sx={{ display: values.inputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            sx={{ mr: 1 }}
            name="inputMode"
            label="Mode:"
            margin="dense"
            size="small"
            value={ values.inputMode }
            onChange={ handleChange }
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            sx={{ mr: 1 }}
            name="inputLatency"
            label="Latency:"
            margin="dense"
            size="small"
            type="number"
            value={ values.inputLatency }
            onChange={ handleChange }
            error={ Boolean(touched.inputLatency && errors.inputLatency) }
            helperText={ touched.inputLatency && errors.inputLatency }
          />
          <TextField
            name="inputPassword"
            label="Passphrase:"
            margin="dense"
            size="small"
            value={ values.inputPassword }
            onChange={ handleChange }
            error={ Boolean(touched.inputPassword && errors.inputPassword) }
            helperText={ touched.inputPassword && errors.inputPassword }
          />
        </Box>
        <TextField
          name="outputUrl"
          label="Output Url:"
          placeholder="udp://ip:port, srt://ip:port"
          margin="dense"
          size="small"
          fullWidth
          sx={{ mt: 2 }}
          value={ values.outputUrl }
          onChange={ handleChange }
          error={ Boolean(touched.outputUrl && errors.outputUrl) }
          helperText={ touched.outputUrl && errors.outputUrl }
        />
        <Box sx={{ display: values.outputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            name="outputMode"
            label="Mode:"
            margin="dense"
            size="small"
            value={ values.outputMode }
            onChange={ handleChange }
            sx={{ mr: 1 }}
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            sx={{ mr: 1 }}
            name="outputLatency"
            label="Latency:"
            margin="dense"
            size="small"
            type="number"
            value={ values.outputLatency }
            onChange={ handleChange }
            error={ Boolean(touched.outputLatency && errors.outputLatency) }
            helperText={ touched.outputLatency && errors.outputLatency }
          />
          <TextField
            name="outputPassword"
            label="Passphrase:"
            margin="dense"
            size="small"
            value={ values.outputPassword }
            onChange={ handleChange }
            error={ Boolean(touched.outputPassword && errors.outputPassword) }
            helperText={ touched.outputPassword && errors.outputPassword }
          />
        </Box>
        <TextField
          name="enabled"
          label="Enabled:"
          margin="normal"
          sx={{ mt: 4 }}
          size="small"
          select
          fullWidth
          value={ values.enabled }
          onChange={ handleChange }
          error={ Boolean(touched.enabled && errors.enabled) }
          helperText={ touched.enabled && errors.enabled }
        >
          <MenuItem value={ true }>Enabled</MenuItem>
          <MenuItem value={ false }>Disabled</MenuItem>
        </TextField>
        <Button
          fullWidth
          sx={{ mt: 4 }}
          variant="outlined"
          color="success"
          type="submit"
          disabled={ isValidating }
        >
          Save Channel
        </Button>
        <Button
          fullWidth
          sx={{ mt: 2 }}
          component={ Link }
          variant="outlined"
          color="error"
          href="/"
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default ChannelForm;

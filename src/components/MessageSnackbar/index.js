import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const MessageSnackbar = ({ open, onClose, message, severity = "success" }) => (
  <Snackbar
    open={ open }
    autoHideDuration={ 6000 }
    onClose={ onClose }
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert onClose={ onClose } severity={ severity } sx={{ width: "100%" }}>
      { message }
    </Alert>
  </Snackbar>
);

export default MessageSnackbar;

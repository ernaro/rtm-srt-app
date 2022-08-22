import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";

import Link from "../Link";

const ChannelAccordion = ({
  id,
  channelName,
  inputUrl,
  outputUrl,
  enabled,
  startChannel,
  stopChannel,
  openDeleteDialog,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          { channelName }
        </Typography>
        <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
          Status: { enabled ? "On" : "Off" }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle2">
          Input: { inputUrl }
        </Typography>
        <Typography variant="subtitle2">
          Output: { outputUrl }
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
          <Button
            variant="outlined"
            color="success"
            size="small"
            disabled={ enabled }
            sx={{ marginRight: "1rem" }}
            onClick={ () => startChannel(id) }
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled={ !enabled }
            sx={{ mr: "auto" }}
            onClick={ () => stopChannel(id) }
          >
            Stop
          </Button>
          <Button
            component={ Link }
            size="small"
            sx={{ marginRight: "1rem" }}
            href={ `/channels/${id}` }
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="small"
            onClick={ () => openDeleteDialog(id, channelName) }
          >
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ChannelAccordion;

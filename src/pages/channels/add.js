import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import ChannelForm from "../../components/ChannelForm";
import ChannelSnackbar from "../../components/ChannelSnackbar";
import { createChannel } from "../../service/apiService";

export default function AddChannel() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleChannelSubmit = (channel) => {
    createChannel(channel)
      .then(() => router.push("/"))
      .catch(() => setSnackOpen(true));
  };

  const handleSnackClose = () => setSnackOpen(false);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <ChannelForm
        formTitle="Add channel"
        submitHandler={ handleChannelSubmit }
      />
      <ChannelSnackbar
        open={ snackOpen }
        onClose={ handleSnackClose }
        message="Channel already exist or input/output url format invalid!!"
      />
    </Container>
  );
}

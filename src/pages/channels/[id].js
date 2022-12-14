import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import Error from "../../components/Error";
import Loader from "../../components/Loader";
import ChannelForm from "../../components/ChannelForm";
import ChannelSnackbar from "../../components/ChannelSnackbar";
import MessageSnackbar from '../../components/MessageSnackbar';
import { updateChannelById, axiosFetcher } from "../../service/apiService";

export default function EditChannel() {
  const router = useRouter();
  const { id } = router.query;
  const { data: channel, error } = useSWR(`/channels/${id}`, axiosFetcher);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleChannelSubmit = (values) => {
    updateChannelById(channel.id, values)
      .then(() => router.push("/"))
      .catch(() => setSnackOpen(true));
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  if (error) return <Error message="Failed to load data!" />;
  if (!channel) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <ChannelForm
        formTitle="Edit channel"
        channel={ channel }
        mappingType={ channel.mappingType }
        submitHandler={ handleChannelSubmit }
      />
      <MessageSnackbar
        open={ snackOpen }
        onClose={ handleSnackClose }
        message="Channel already exist or input/output url format invalid!"
      />
    </Container>
  );
}

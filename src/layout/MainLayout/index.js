import Head from 'next/head'
import NavBar from "../../components/NavBar";
import Box from '@mui/material/Box';

export default function MainLayout({ children }){
  return(
    <>
      <Head>
        <title>RTM SRT</title>
      </Head>
      <NavBar />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        { children }
      </Box>
    </>
  )
}
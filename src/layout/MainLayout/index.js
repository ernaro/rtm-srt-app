import Head from 'next/head'
import NavBar from "../../components/NavBar";

export default function MainLayout({ children }){
  return(
    <>
      <Head>
        <title>RTM SRT</title>
      </Head>
      <NavBar />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        { children }
      </div>
    </>
  )
}
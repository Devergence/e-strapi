import { FC } from 'react'
import Head from "next/head"
import {Header} from "../components/Header";

const Home: FC = () => {
  return (
    <>
     <Head>
       <title>Homepage</title>
     </Head>

      <main>
        <Header/>
        <h1>Hello</h1>
      </main>
    </>
  )
}

export default Home

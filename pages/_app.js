// 全局配置

import Head from "next/head"
import "styles/globals.scss"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>我的博客</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover"
        ></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

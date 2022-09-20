import { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import styles from "styles/Home.module.scss"
import png from "assets/images/bg.png"
import { UAParser } from "ua-parser-js"
import { useEffect, useState } from "react"

type Props = {
  browser: {
    name: string
    version: string
    major: string
  }
}

const Home: NextPage<Props> = props => {
  const { browser } = props
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
  }, [])
  return (
    <div className={styles.wrapper}>
      <h1>浏览器是 {browser.name}</h1>
      <h1>窗口大小是 {width}</h1>
      <Image src={png} alt="这是一张图片" width={100} height={100} />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async context => {
  const ua = context.req.headers["user-agent"]
  const result = new UAParser(ua).getResult()
  return {
    props: {
      browser: result.browser,
    },
  }
}

import Image from "next/image"
import styles from "styles/Home.module.scss"
import png from "assets/images/bg.png"

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <h1>标题1 </h1>
      <div>段落</div>
      <Image src={png} alt="这是一张图片" width={100} height={100} />
    </div>
  )
}

export default Home

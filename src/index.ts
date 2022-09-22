import { AppDataSource } from "./data-source"

AppDataSource.initialize()
  .then(async () => {
    console.log("连接成功")
  })
  .catch(error => console.log(error))

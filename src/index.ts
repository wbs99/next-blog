import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"

AppDataSource.initialize()
  .then(async () => {
    const posts = await AppDataSource.manager.find(Post)
    console.log("开始")
    console.log(posts)
    const p = new Post()
    p.title = "Post 1"
    p.content = "我的第一篇文章"
    await AppDataSource.manager.save(p)
    const posts2 = await AppDataSource.manager.find(Post)
    console.log("结束")
    console.log(posts2)
  })
  .catch(error => console.log(error))

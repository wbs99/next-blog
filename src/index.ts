import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"

AppDataSource.initialize()
  .then(async () => {
    const posts = await AppDataSource.manager.find(Post)
    if (posts.length === 0) {
      await AppDataSource.manager.save(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
          return new Post({
            title: `Post ${number}`,
            content: `这是我的第${number}篇文章`,
          })
        })
      )
    }
  })
  .catch(error => console.log(error))

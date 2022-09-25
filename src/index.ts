import { AppDataSource } from "./data-source"
import { Post } from "./entity/Post"
import { User } from "./entity/User"
import { Comment } from "./entity/Comment"

AppDataSource.initialize()
  .then(async () => {
    // 创建 user1
    const u1 = new User()
    u1.username = "Jack22"
    u1.passwordDigest = "123456"
    await AppDataSource.manager.save(u1)
    // 创建 post 1
    const p1 = new Post()
    p1.title = "Post 1"
    p1.content = "My First Post"
    p1.author = u1
    await AppDataSource.manager.save(p1)
    // 创建 comment1
    const c1 = new Comment()
    c1.user = u1
    c1.post = p1
    c1.content = "Awesome"
    await AppDataSource.manager.save(c1)
  })
  .catch(error => console.log(error))

import { withIronSessionApiRoute } from "iron-session/next"
import { getDataBaseConnection } from "lib/getDataBaseConnection"
import { sessionOptions } from "lib/session"
import { NextApiHandler } from "next"
import { Post } from "src/entity/Post"

const Posts: NextApiHandler = async (req, res) => {
  const { title, content } = req.body
  const post = new Post()
  post.title = title
  post.content = content
  const user = req.session.user
  if (!user) {
    res.statusCode = 401
    res.end()
    return
  } else {
    post.author = user
    const connection = await getDataBaseConnection()
    await connection.manager.save(post)
    res.json(post)
  }
}

export default withIronSessionApiRoute(Posts, sessionOptions)

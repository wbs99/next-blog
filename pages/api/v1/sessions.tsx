import { getDataBaseConnection } from "lib/getDataBaseConnection"
import md5 from "md5"
import { NextApiHandler } from "next"
import { User } from "src/entity/User"
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "lib/session"

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body

  const connection = await getDataBaseConnection()
  const user = await connection.manager.findOne(User, { where: { username } })
  res.setHeader("Content-Type", "application/json;charset=utf-8")
  if (user) {
    const passwordDigest = md5(password)
    if (user.passwordDigest === passwordDigest) {
      req.session.user = user
      await req.session.save()
      res.end(res.json(user))
      res.statusCode = 200
    } else {
      res.statusCode = 422
      res.end(JSON.stringify({ password: ["密码不匹配"] }))
    }
  } else {
    res.statusCode = 422
    res.end(JSON.stringify({ username: ["用户名不存在"] }))
  }
}

export default withIronSessionApiRoute(Sessions, sessionOptions)

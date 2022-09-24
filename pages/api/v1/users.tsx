import { getDataBaseConnection } from "lib/getDataBaseConnection"
import { NextApiHandler } from "next"
import { User } from "src/entity/User"
const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body
  const connection = await getDataBaseConnection()
  res.setHeader("Content-Type", "application/json;charset=utf-8")
  const user = new User()
  user.username = username.trim()
  user.password = password
  user.passwordConfirmation = passwordConfirmation
  await user.validate()
  if (user.hasErrors()) {
    res.statusCode = 422
    res.write(JSON.stringify(user.errors))
  } else {
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}

export default Users

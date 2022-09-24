import { getDataBaseConnection } from "lib/getDataBaseConnection"
import { NextApiHandler } from "next"
import { User } from "src/entity/User"
import md5 from "md5"

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body
  const connection = await getDataBaseConnection()

  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }
  if (username.trim() === "") {
    errors.username.push("用户名不能为空")
  }
  if (!/[a-zA-Z0-9]/.test(username.trim())) {
    errors.username.push("格式不合法")
  }
  if (username.trim().length > 42) {
    errors.username.push("用户名太长")
  }
  if (username.trim().length <= 3) {
    errors.username.push("用户名太短")
  }
  const found = await connection.manager
    .getRepository(User)
    .findOneBy({ username })
  if (found) {
    errors.username.push("该用户名已存在，不能重复注册")
  }

  if (password === "") {
    errors.password.push("密码不能为空")
  }
  if (password !== passwordConfirmation) {
    errors.password.push("密码不匹配")
  }

  const hasError = Object.values(errors).find(item => item.length > 0)
  res.setHeader("Content-Type", "application/json;charset=utf-8")
  if (hasError) {
    res.statusCode = 422
    res.write(JSON.stringify(errors))
  } else {
    const user = new User()
    user.username = username.trim()
    user.passwordDigest = md5(password)
    await connection.manager.save(user)
    res.statusCode = 200
    res.write(JSON.stringify(user))
  }
  res.end()
}

export default Users

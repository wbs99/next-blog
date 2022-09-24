import { User } from "../entity/User"
import md5 from "md5"
import { getDataBaseConnection } from "lib/getDataBaseConnection"

export class SignIn {
  username: string
  password: string
  user: User

  constructor(username: string, password: string, user: User) {
    this.username = username
    this.password = password
    this.user = user
  }

  errors = { username: [] as string[], password: [] as string[] }

  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("请填写用户名")
    }
    const connection = await getDataBaseConnection()
    const user = (await connection.manager.findOne(User, {
      where: { username: this.username },
    })) as User
    this.user = user
    if (user) {
      if (user.passwordDigest !== md5(this.password)) {
        this.errors.password.push("密码与用户名不匹配")
      }
    } else {
      this.errors.username.push("用户名不存在")
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(v => v.length > 0)
  }
}

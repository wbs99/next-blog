import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"
import { getDataBaseConnection } from "lib/getDataBaseConnection"
import md5 from "md5"
import _ from "lodash"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number
  @Column("varchar")
  username!: string
  @Column("varchar")
  passwordDigest!: string
  @CreateDateColumn()
  createdAt!: Date
  @UpdateDateColumn()
  updatedAt!: Date
  @OneToMany("Post", "author") // 一个 user 可以有很多 post
  posts!: Post[]
  @OneToMany("Comment", "user") // 一个 user 可以有很多 post
  comments!: Comment[]

  // constructor(
  //   id?: number,
  //   username?: string,
  //   passwordDigest?: string,
  //   createdAt?: Date,
  //   updatedAt?: Date,
  //   posts?: Post[],
  //   comments?: Comment[]
  // ) {
  //   this.id = id
  //   this.username = username
  //   this.passwordDigest = passwordDigest
  //   this.createdAt = createdAt
  //   this.updatedAt = updatedAt
  //   this.posts = posts
  //   this.comments = comments
  // }

  // 下面不是数据库中的字段，只是 User 类上的属性
  // yarn migration:run 注释下面代码
  errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  }

  password!: string
  passwordConfirmation!: string

  async validate() {
    if (this.username.trim() === "") {
      this.errors.username.push("用户名不能为空")
    }
    if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
      this.errors.username.push("格式不合法")
    }
    if (this.username.trim().length > 42) {
      this.errors.username.push("用户名太长")
    }
    if (this.username.trim().length <= 3) {
      this.errors.username.push("用户名太短")
    }
    const found = await (await getDataBaseConnection()).manager
      .getRepository(User)
      .findOneBy({ username: this.username })
    if (found) {
      this.errors.username.push("该用户名已存在，不能重复注册")
    }

    if (this.password === "") {
      this.errors.password.push("密码不能为空")
    }
    if (this.password !== this.passwordConfirmation) {
      this.errors.password.push("密码不匹配")
    }
  }

  hasErrors() {
    return !!Object.values(this.errors).find(item => item.length > 0)
  }

  // 创建 user 之前，处理 password
  @BeforeInsert()
  generatePasswordDigest() {
    this.passwordDigest = md5(this.password)
  }

  // 过滤返回给前端的字段
  toJSON() {
    return _.omit(this, [
      "password",
      "passwordConfirmation",
      "passwordDigest",
      "errors",
    ])
  }
}

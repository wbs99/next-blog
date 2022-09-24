import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "src/entity/Post"
import { Comment } from "src/entity/Comment"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "192.168.0.101",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  //entities: ["dist/entity/**/*.js"], // 运行 migration:run 或者 yarn migration:revert 的时候使用这个,
  entities: ["dist/entity/**/*.js", Post, User, Comment], //
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
})

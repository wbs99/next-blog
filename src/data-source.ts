import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "src/entity/Post"
import { Comment } from "src/entity/Comment"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "192.168.0.100",
  port: 5432,
  username: "blog",
  password: "",
  database: "blog_development",
  synchronize: false,
  logging: false,
  entities: ["dist/entity/**/*.js", Post, User, Comment],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
})

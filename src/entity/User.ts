import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Post } from "./Post"
import { Comment } from "./Comment"

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
  @OneToMany(() => Post, post => post.author) // 一个 user 可以有很多 post
  posts!: Post[]
  @OneToMany(() => Comment, comment => comment.user) // 一个 user 可以有很多 post
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
}

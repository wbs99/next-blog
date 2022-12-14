import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { Post } from "./Post"
import { User } from "./User"

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("increment")
  id!: number
  @Column("text")
  content!: string
  @CreateDateColumn()
  createdAt!: Date
  @UpdateDateColumn()
  updatedAt!: Date
  @ManyToOne("User", "comments")
  user!: User
  @ManyToOne("Post", "comments")
  post!: Post

  // constructor(
  //   id: number,
  //   content: string,
  //   user: User,
  //   post: Post,
  //   createdAt: Date,
  //   updatedAt: Date
  // ) {
  //   this.id = id
  //   this.content = content
  //   this.user = user
  //   this.post = post
  //   this.createdAt = createdAt
  //   this.updatedAt = updatedAt
  // }
}

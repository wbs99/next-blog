import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { User } from "./User"
import { Comment } from "./Comment"

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id!: number
  @Column("varchar")
  title!: string
  @Column("text")
  content!: string
  @CreateDateColumn()
  createdAt!: Date
  @UpdateDateColumn()
  updatedAt!: Date
  @ManyToOne(() => User, user => user.posts)
  author!: User
  @OneToMany(() => Comment, comment => comment.post) // 一个 user 可以有很多 post
  comments!: Comment[]

  // constructor(
  //   id: number,
  //   title: string,
  //   content: string,
  //   createdAt: Date,
  //   updatedAt: Date,
  //   author: User,
  //   comments: Comment[]
  // ) {
  //   this.id = id
  //   this.title = title
  //   this.content = content
  //   this.createdAt = createdAt
  //   this.updatedAt = updatedAt
  //   this.author = author
  //   this.comments = comments
  // }
}

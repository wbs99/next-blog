import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("posts") // 对应 migration 创建的 table 的名称
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar")
  title: string

  @Column("text")
  content: string

  constructor(attributes: Partial<Post>) {
    Object.assign(this, attributes)
  }
}

import { GetServerSideProps, NextPage } from "next"
import { Post } from "src/entity/Post"
import { getDataBaseConnection } from "lib/getDataBaseConnection"

type Props = {
  post: Post
}
const PostShow: NextPage<Props> = props => {
  const { post } = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
    </div>
  )
}

export default PostShow

export const getServerSideProps: GetServerSideProps<
  any,
  { id: string }
> = async context => {
  const connection = await getDataBaseConnection()
  const post = await connection.manager
    .getRepository(Post)
    .findOneBy({ id: parseInt(context.params!.id) })
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  }
}

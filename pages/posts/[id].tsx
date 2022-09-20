import { getPost, getPostIDs } from "lib/posts"
import { NextPage } from "next"

type Props = {
  post: Post
}
const PostShow: NextPage<Props> = props => {
  const { post } = props
  return (
    <div>
      <h1>{post.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: post.htmlContent }}></article>
    </div>
  )
}

export default PostShow

export const getStaticPaths = async () => {
  const idList = await getPostIDs()
  return {
    paths: idList.map(id => ({ params: { id: id } })),
    fallback: false,
  }
}

export const getStaticProps = async (x: any) => {
  const id = x.params.id
  const post = await getPost(id)
  return {
    props: {
      post: post,
    },
  }
}

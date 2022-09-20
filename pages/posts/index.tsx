import { usePosts } from "hooks/usePosts"
import { getPosts } from "lib/posts"
import { NextPage } from "next"

type Props = {
  posts: PostType[]
}

const PostsIndex: NextPage<Props> = props => {
  const { posts } = props
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => (
        <div key={p.id}>{p.id}</div>
      ))}
    </div>
  )
}

export default PostsIndex

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

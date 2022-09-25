import { getDataBaseConnection } from "lib/getDataBaseConnection"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { Post } from "src/entity/Post"
import qs from "query-string"
import { usePager } from "hooks/usePager"

type Props = {
  posts: Post[]
  count: number
  perPage: number
  page: number
  totalPage: number
}

const PostsIndex: NextPage<Props> = props => {
  const { posts, count, page, totalPage } = props
  const { pager } = usePager({ page, totalPage })
  return (
    <div>
      <h1>
        文章列表({props.count}) 每页{props.perPage}
      </h1>
      {posts.map(post => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
      <footer>{pager}</footer>
    </div>
  )
}

export default PostsIndex

export const getServerSideProps: GetServerSideProps = async context => {
  let page
  if (context.req.url !== undefined) {
    page = parseInt(qs.parse(context.req.url.substring(6)).page as string)
  } else {
    page = 1
  }
  const connection = await getDataBaseConnection()
  const perPage = 3
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: (page - 1) * perPage,
    take: perPage,
  })
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      page,
      totalPage: Math.ceil(count / perPage),
    },
  }
}

import { getDataBaseConnection } from "lib/getDataBaseConnection"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { Post } from "src/entity/Post"
import qs from "query-string"

type Props = {
  posts: Post[]
  count: number
  page: number
}

const PostsIndex: NextPage<Props> = props => {
  const { posts, count, page } = props

  return (
    <div>
      <h1>文章列表 {count}</h1>
      {posts.map(p => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </div>
      ))}
      <footer>
        共 {count} 篇文章，当前是第 {page} 页
        <Link href={`?page=${props.page - 1}`}>
          <a>上一页</a>
        </Link>
        |
        <Link href={`?page=${props.page + 1}`}>
          <a>下一页</a>
        </Link>
      </footer>
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
    },
  }
}

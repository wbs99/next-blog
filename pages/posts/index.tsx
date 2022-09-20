import { usePosts } from "hooks/usePosts"
import { NextPage } from "next"

const PostsIndex: NextPage = () => {
  const { isLoading, isEmpty, posts } = usePosts()
  return (
    <div>
      {isLoading ? (
        <div>加载中</div>
      ) : isEmpty ? (
        <div>没有文章</div>
      ) : (
        posts.map(p => <div key={p.id}>{p.id}</div>)
      )}
    </div>
  )
}

export default PostsIndex

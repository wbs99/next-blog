import { useEffect, useState } from "react"
import axios from "axios"

type PostType = {
  id: string
  date: string
  title: string
}

export const usePosts = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get("api/v1/posts").then(
      response => {
        setPosts(response.data)
        if (response.data.length === 0) {
          setIsEmpty(true)
        }
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }, [])

  return { posts, setPosts, isLoading, setIsLoading, isEmpty, setIsEmpty }
}

declare module "*.png" {
  const value: string
  export default value
}

type Post = {
  id: string
  date: string
  title: string
  content: string
  htmlContent: string
}

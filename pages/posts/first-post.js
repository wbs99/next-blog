import React from "react"
import Link from "next/link"

const X = () => {
  return (
    <div>
      first page
      <hr />
      <Link href="/">
        <a>回到首页</a>
      </Link>
    </div>
  )
}

export default X

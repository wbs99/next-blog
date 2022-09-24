import { NextPage } from "next"
import { useCallback, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { withIronSessionSsr } from "iron-session/next"
import { User } from "src/entity/User"

type Props = {
  user: User
}

const SignUp: NextPage<Props> = props => {
  const { user } = props
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  })
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      axios.post(`/api/v1/sessions`, formData).then(
        () => {
          window.alert("登录成功")
        },
        error => {
          if (error.response) {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
              setErrors(response.data)
            }
          }
        }
      )
    },
    [formData]
  )
  return (
    <>
      <h1>登录</h1>
      {user && <div>当前登录用户为 ：{user.username}</div>}
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={e =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />
          </label>
          {errors.username?.length > 0 && (
            <div>{errors.username.join(",")}</div>
          )}
        </div>
        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={e =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </label>
          {errors.password?.length > 0 && (
            <div>{errors.password.join(",")}</div>
          )}
        </div>
        <div>
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  )
}

export default SignUp

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.user || null,
      },
    }
  },
  {
    cookieName: "blog",
    password: "fec2ba97-6ba0-433e-9c9d-03fbcb2585ed",
    cookieOptions: {
      secure: false,
    },
  }
)

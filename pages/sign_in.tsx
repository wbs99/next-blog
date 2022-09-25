import { NextPage } from "next"
import axios, { AxiosResponse } from "axios"
import { withIronSessionSsr } from "iron-session/next"
import { User } from "src/entity/User"
import { useForm } from "hooks/useForm"
import qs from "query-string"

type Props = {
  user: User
}

const SignIn: NextPage<Props> = props => {
  const { form } = useForm({
    initFormData: { username: "", password: "" },
    fields: [
      { label: "用户名", type: "text", key: "username" },
      { label: "密码", type: "password", key: "password" },
    ],
    buttons: <button type="submit">登录</button>,
    submit: {
      request: formData => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert("登录成功")
        const query = qs.parse(window.location.search)
        window.location.href = query.return_to as string
      },
    },
  })

  return (
    <>
      {props.user && <div>当前登录用户为 {props.user.username}</div>}
      <h1>登录</h1>
      {form}
    </>
  )
}

export default SignIn

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

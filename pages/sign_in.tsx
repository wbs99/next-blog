import { NextPage } from "next"
import { useCallback, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { withIronSessionSsr } from "iron-session/next"
import { User } from "src/entity/User"
import { Form } from "components/Form"

type Props = {
  user: User
}

const SignIn: NextPage<Props> = props => {
  const { user } = props
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
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

  const onChange = useCallback(
    (key: string, value: string) => {
      setFormData({ ...formData, [key]: value })
    },
    [formData]
  )

  return (
    <>
      {props.user && <div>当前登录用户为 {props.user.username}</div>}
      <h1>登录</h1>
      <Form
        fields={[
          {
            label: "用户名",
            type: "text",
            value: formData.username,
            onChange: e => onChange("username", e.target.value),
            errors: errors.username,
          },
          {
            label: "密码",
            type: "password",
            value: formData.password,
            onChange: e => onChange("password", e.target.value),
            errors: errors.password,
          },
        ]}
        onSubmit={onSubmit}
        buttons={
          <>
            <button type="submit">登录</button>
          </>
        }
      />
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

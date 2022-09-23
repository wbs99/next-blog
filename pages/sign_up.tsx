import axios, { AxiosResponse } from "axios"
import { NextPage } from "next"
import { useCallback, useState } from "react"

const SignUp: NextPage = props => {
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
      axios.post(`api/v1/users`, formData).then(
        () => {},
        error => {
          if (error.response) {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
              setErrors({ ...error, ...response.data })
            }
          }
        }
      )
    },
    [formData]
  )
  return (
    <>
      <h1>注册</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={e => {
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }}
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
              onChange={e => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }}
            />
          </label>
          {errors.password?.length > 0 && (
            <div>{errors.password.join(",")}</div>
          )}
        </div>
        <div>
          <label>
            确认密码
            <input
              type="password"
              value={formData.passwordConfirmation}
              onChange={e => {
                setFormData({
                  ...formData,
                  passwordConfirmation: e.target.value,
                })
              }}
            />
          </label>
          {errors.passwordConfirmation?.length > 0 && (
            <div>{errors.passwordConfirmation.join(",")}</div>
          )}
        </div>
        <button type="submit">注册</button>
      </form>
    </>
  )
}

export default SignUp

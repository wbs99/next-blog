import type { IronSessionOptions } from "iron-session"
import { User } from "src/entity/User"

export const sessionOptions: IronSessionOptions = {
  password: "fec2ba97-6ba0-433e-9c9d-03fbcb2585ed",
  cookieName: "blog",
  cookieOptions: {
    secure: false,
  },
}

declare module "iron-session" {
  interface IronSessionData {
    user?: User
  }
}

export interface RegisterRequstInterface {
  user: {
    username?: string,
    password: string,
    email: string,
  }
}

export interface UserInterface {
  password: string,
  email: string
}
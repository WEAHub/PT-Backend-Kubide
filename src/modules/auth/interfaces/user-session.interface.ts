interface IUserSession {
  username: string
  email: string
  token: string
}

interface IUserToken {
	username: string;
  email: string
	userId: number;
}

export {
  IUserSession,
  IUserToken
}
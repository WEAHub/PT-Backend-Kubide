interface IUser {
	id: number;
	username: string;
	password: string;
	created_dt: Date;
	updated_dt: Date;
}

interface IUserModifiedMessage{
	message: string
}

export {
	IUser,
	IUserModifiedMessage
}
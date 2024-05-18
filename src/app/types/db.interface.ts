export interface IUser {
	id?: number;
	nickname?: string;
	email: string;
	password: string;
	name?: string;
	lastname?: string;
	dateBirth?: Date;
	avatar?: string;
	isBanned?: boolean;
	banReason?: string;
	createdAt?: Date;
	roles?: Roles[];
}

interface Roles {
	role: IRole[]
}
export interface IRole {
	id: number
	name: string
}

export interface IGame{
	id: number,
	name: string,
	image: string,
	logo: string
}

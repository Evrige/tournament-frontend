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

export interface IArena{
	id: number,
	name: string,
	location: string,
	capacity: number
}

export interface ITournament {
	id: number,
  name: string,
  prizePool?: number,
	type: string,
	teamCount: number,
	date: Date,
	minRating?: number,
	maxRating?: number,
	arenaId?: number,
	arena?: IArena,
	gameId?: number,
	game?: IGame,
	status: string,
	format: number,
	registrationClosedAt?: Date
}
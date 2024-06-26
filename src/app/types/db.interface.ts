export interface ITeam {
	id: number
	name: string
	logo: string
	user?: IUser[]
}

export interface IUser {
	id: number;
	nickname: string;
	email: string;
	password: string;
	name?: string;
	lastname?: string;
	dateBirth?: Date;
	avatar: string;
	isBanned?: boolean;
	banReason?: string;
	createdAt: Date;
	roles: { role: IRole }[];
	teamId?: number
	team?: ITeam
}

export interface IInvites {
	teamInvites: [{
		id: number
		userId: number
		teamId: number
		status: EnumInviteStatus
		team: ITeam
		createdAt: Date
		updatedAt: Date
	}]
	friendInvites: [{
		id: number
    user1Id: number
    user2Id: number
    status: EnumInviteStatus
    user1: IUser
		createdAt: Date
		updatedAt: Date
	}]
}

export enum EnumInviteStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	DECLINED = 'DECLINED',
}

export interface IRole {
	id: number
	name: EnumRole
}

export enum EnumRole {
	ADMIN = 'ADMIN',
	USER = 'USER',
	MANAGER = 'MANAGER',
	ANALYST = 'ANALYST'
}

export interface IGame {
	id: number,
	name: string,
	image: string,
	logo: string
}

export interface IMap {
	id: number,
	name: string,
	banner: string
}

export interface IArena {
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
	gameId: number,
	game: IGame,
	status: EnumTournamentStatus,
	format: number,
	teamList: IListTeam[]
}

export enum EnumTournamentStatus {
	PLANNED = 'PLANNED',
	ONGOING = 'ONGOING',
	FINISHED = 'FINISHED',
	CANCELLED = 'CANCELLED'
}

export interface IMatch {
	id: number
	team1Id: number
	team2Id: number
	nextMatchId: number
	teamWinId: number
	tournamentRoundText: string
	startTime: Date
	tournamentId: number
	mapId: number
	state: string
	team1RoundsWon: number
	team2RoundsWon: number
	team1: ITeam
	team2: ITeam,
	map: IMap
}

export interface IListTeam {
	id: number
	teamId: number
	tournamentId: number
	stage: number
	placement: number
	createdAt: Date
	team: ITeam
}


export interface IRating {
	id: number,
	teamId: number,
	userId: number,
  points: number,
	team: ITeam
	user: IUser
}
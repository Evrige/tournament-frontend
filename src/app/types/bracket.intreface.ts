import { IUser } from '@/app/types/db.interface'

interface IParticipant {
	id: number | null;
	resultText: string;
	isWinner: boolean;
	status: string | null;
	name: string | null;
	logo: string | null;
	user: IUser[]
}

export interface IBracket {
	id: number;
	nextMatchId: number;
	tournamentRoundText: string;
	startTime: string;
	state: string;
	map: string;
	tournamentId: number;
	participants: IParticipant[];
}
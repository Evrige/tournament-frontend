import { IMatch } from '@/app/types/db.interface'
import { format } from 'date-fns'
import { formatDate } from '@/app/utils/formatDate'

export const formatMatches = (matches:IMatch[]) => matches.map(match => {
		return {
			id: match.id,
			nextMatchId: match.nextMatchId,
			tournamentRoundText: match.tournamentRoundText,
			startTime: formatDate(match.startTime),
			state: match.state,
			map: match.map,
			tournamentId: match.tournamentId,
			participants: [
				{
					id: match?.team1?.id,
					resultText: match.team1RoundsWon || "0",
					isWinner: match?.team1?.id === match.teamWinId,
					status: null,
					name: match?.team1?.name,
					logo: match?.team1?.logo,
					user: match?.team1?.user
				},
				{
					id: match?.team2?.id,
					resultText: match.team2RoundsWon || "0",
					isWinner: match?.team2?.id === match.teamWinId,
					status: null,
					name: match?.team2?.name,
					logo: match?.team2?.logo,
					user: match?.team2?.user
				}
			]
		}
	}
)
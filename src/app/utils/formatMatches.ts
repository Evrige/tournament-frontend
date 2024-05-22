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
			participants: [
				{
					id: match?.team1?.id,
					resultText: "",
					isWinner: match?.team1?.id === match.teamWinId,
					status: null,
					name: match?.team1?.name
				},
				{
					id: match?.team2?.id,
					resultText: "",
					isWinner: match?.team2?.id === match.teamWinId,
					status: null,
					name: match?.team2?.name
				}
			]
		}
	}
)
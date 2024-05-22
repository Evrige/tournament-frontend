import React from 'react'
import instance from '@/app/api/api.interseptor'
import { IMatch } from '@/app/types/db.interface'
import Bracket from '@/app/components/Bracket'
import { formatMatches } from '@/app/utils/formatMatches'


const fetchMatchByTournament = async (id: string): Promise<IMatch[]> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_MATCH_BY_TOURNAMENT_ID_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};
const Page = async ({ params }: {params: {id: string}}) => {
	const matchesData = await fetchMatchByTournament(params.id)
	return (
		<div>
			<Bracket matches={formatMatches(matchesData)}/>
		</div>
	)
}

export default Page
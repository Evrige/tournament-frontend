import React from 'react'
import instance from '@/app/api/api.interseptor'
import { ITournament } from '@/app/types/db.interface'
import TeamsList from '@/app/components/TeamsList'

const fetchTournament = async (id: string): Promise<ITournament> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_TOURNAMENT_BY_ID_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};
const Page = async ({ params }: {params: {id: string}}) => {
	const tournament = await fetchTournament(params.id);

	return (
		<div className="p-3">
			<TeamsList tournament={tournament}/>
		</div>
	)
}

export default Page
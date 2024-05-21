import React from 'react'
import { ITournament } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'
import TournamentPage from '@/app/components/TournamentPage'

export async function generateStaticParams() {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_TOURNAMENT_URL,
		method: 'GET',
	});
	const tournaments = response.data;

	return tournaments.map((tournament:ITournament) => ({
		id: tournament.id.toString(),
	}))
}

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
		<div className="bg-bgSecondary">
				<TournamentPage tournament={tournament}/>
		</div>
	);
};

export default Page;
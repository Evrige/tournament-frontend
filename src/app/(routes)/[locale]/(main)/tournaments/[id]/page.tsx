import React from 'react'
import { ITournament } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'
import TournamentPage from '@/app/components/TournamentPage'
import { fetchTournament } from '@/app/service/getTournament'

export const dynamic = 'force-dynamic'
export async function generateStaticParams() {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_TOURNAMENT_URL,
		method: 'GET',
	});
	const tournaments = response.data;

	return tournaments.map((tournament:ITournament) => ({
		id: tournament.id.toString(),
		fallback: true
	}))
}


const Page = async ({ params }: {params: {id: string}}) => {
	 const tournament = await fetchTournament(params.id);

	return (
		<div>
				<TournamentPage/>
		</div>
	);
};

export default Page;
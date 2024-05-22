import { Metadata } from 'next'
import { ITournament } from '@/app/types/db.interface'
import TournamentPageHeader from '@/app/components/TournamentPageHeader'
import instance from '@/app/api/api.interseptor'
import React from 'react'
import { TournamentProvider } from '@/app/components/TournamentProvider'

const fetchTournament = async (id: string): Promise<ITournament> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_TOURNAMENT_BY_ID_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};

export const metadata: Metadata = {
	title: 'Tournament page',
	description: '',
}
export default async function TournamentLayout({
																								 children,
																								 params: { id }
																							 }: Readonly<{
	children: React.ReactNode;
	params: { id: string }
}>) {
	const tournament = await fetchTournament(id);
	return (
		<div className="bg-bgSecondary min-h-[calc(100vh-85px)]">
			<TournamentProvider tournament={tournament}>
				<TournamentPageHeader/>
				{children}
      </TournamentProvider>
		</div>
	)
}


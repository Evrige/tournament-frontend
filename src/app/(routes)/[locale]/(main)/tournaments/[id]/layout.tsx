import { Metadata } from 'next'
import TournamentPageHeader from '@/app/components/TournamentPageHeader'
import React from 'react'
import { TournamentProvider } from '@/app/components/Providers/TournamentProvider'
import { fetchTournament } from '@/app/service/getTournament'


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


import {Metadata} from "next";
import Aside from '@/app/components/Aside'
import { ITournament } from '@/app/types/db.interface'
import TournamentPageHeader from '@/app/components/TournamentPageHeader'
import instance from '@/app/api/api.interseptor'
import React from 'react'

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
		<div>
			<TournamentPageHeader tournament={tournament}/>
			{children}
		</div>
	)
}
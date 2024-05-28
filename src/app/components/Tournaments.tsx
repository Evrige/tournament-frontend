import React from 'react'
import useTournaments from '@/app/hooks/useTouraments'
import Tournament from '@/app/components/Tournament'
import Loader from '@/app/(routes)/loader'

const Tournaments = () => {

	const { data: tournaments, isLoading } = useTournaments()
	if (isLoading) {
		return <Loader/>
	}

	return (
		<div className="flex gap-5 flex-wrap mt-5 ml-5">
			{tournaments?.map(tournament => {
				return (
						<Tournament tournament={tournament} key={tournament.id}/>
				)
			})}
		</div>
	)
}

export default Tournaments
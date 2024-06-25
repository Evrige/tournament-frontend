"use client"
import React from 'react'
import { IListTeam, ITournament } from '@/app/types/db.interface'
import { useTranslations } from 'next-intl'
import TeamLogo from '@/app/components/UI/TeamUserLogo'
import { formatDateTime } from '@/app/utils/formatDateTime'
import { useTournament } from '@/app/components/Providers/TournamentProvider'

const TeamsList = () => {
	const dic = useTranslations()
	const { tournament, updateTournament } = useTournament();
	return (
		<div className="flex justify-between gap-2">
			<div className="rounded-[4px] w-2/3 overflow-hidden">
				<div className="bg-bgTable p-2 flex justify-between">
					<h1 className="text-xl text-accentText">{dic("Tournament.Teams.teamsTitle")}</h1>
					<p className="text-lg text-accentText mr-5">{dic("Tournament.Teams.joinAt")}</p>
				</div>
				{!tournament.teamList.length ?
					<div className="bg-bgPrimary px-2 py-1">{dic("Tournament.Teams.noTeams")}</div> :
					tournament.teamList.map((teamData) => (
					<div key={teamData.id} className="flex justify-between items-center bg-bgPrimary px-2 py-1 border-b border-b-gray-900">
						<div className="flex gap-2 items-center">
							<TeamLogo url={teamData.team.logo} alt={dic("Tournament.Teams.teamAlt")} />
							<p className="text-lg text-accentText">{teamData.team.name}</p>
						</div>
						<div>{formatDateTime(teamData.createdAt)}</div>
					</div>
				))}
			</div>
			<div className="rounded-[4px] w-1/3 overflow-hidden">
				<div className="bg-bgTable p-2">
					<h1 className="text-xl text-accentText">{dic("Tournament.Teams.available")}</h1>
				</div>
				<div className="flex justify-between items-center bg-bgPrimary text-lg px-2 py-1 rounded-b-[4px]">
					<p>{dic("Tournament.Teams.fill")}</p>
					<p className="text-accentText">{tournament.teamList.length}/{tournament.teamCount}</p>
				</div>
			</div>
		</div>

	)
}

export default TeamsList
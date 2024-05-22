'use client'
import React from 'react'
import BackgroundImage from '@/app/components/BackgroundImage'
import { getImageUrl } from '@/app/utils/getImageUrl'
import PageMenu from '@/app/components/PageMenu'
import { menuTournamentItems } from '@/app/constants/menuItems'
import { useLocale, useTranslations } from 'next-intl'
import { EnumRole, EnumTournamentStatus, ITournament } from '@/app/types/db.interface'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrimaryButton from '@/app/components/UI/PrimaryButton'
import useUser from '@/app/hooks/useUser'
import instance from '@/app/api/api.interseptor'
import { defaultNotify } from '@/app/utils/notification/defaultNotify'

const joinLeaveTournament = async (tournamentId: number, action: string) => {
	const url = action === 'join' ? `${process.env.NEXT_PUBLIC_JOIN_TOURNAMENT_URL}` :
		`${process.env.NEXT_PUBLIC_LEAVE_TOURNAMENT_URL}`
	const response = await instance({
		url: `${url}/${tournamentId}`,
		method: 'GET'
	})
	return response.data
}


const TournamentPageHeader = ({ tournament }: { tournament: ITournament }) => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const { data: user } = useUser()

	const isRegOpen = !user?.roles.some(role => role.role.name === EnumRole.MANAGER)
		&& tournament.status !== EnumTournamentStatus.PLANNED
	const isTeamAlreadyReg = tournament.teamList.some(team => team.teamId === user?.teamId)
	console.log(tournament)
	const handleSubmit = async (action: string) => {
		const response = await joinLeaveTournament(tournament.id, action)
		if (response.tournament) tournament = response.tournament
		defaultNotify(response.message)
	}

	return (
		<div className="relative">
			<BackgroundImage src={getImageUrl(tournament.game.image)} alt={dic('Tournament.bgImage')} />
			<div className="absolute bottom-0 z-10 pl-5 w-full">
				<div className="flex justify-between relative">
					<div>
						<h1 className="text-accentText text-4xl">{tournament.name}</h1>
						<PageMenu menuList={menuTournamentItems} />
					</div>
					{isRegOpen ? '' :
						isTeamAlreadyReg ?
							<div className="absolute bottom-0 right-0 mr-10 mb-4" onClick={() => handleSubmit('leave')}>
								<PrimaryButton title={dic('Tournament.leaveToTournament')} color="buttonColor" />
							</div> :
							<div className="absolute bottom-0 right-0 mr-10 mb-4" onClick={() => handleSubmit('join')}>
								<PrimaryButton title={dic('Tournament.joinToTournament')} color="primary" />
							</div>}
				</div>
			</div>
			<Breadcrumbs name={tournament.name} />
		</div>
	)
}

export default TournamentPageHeader



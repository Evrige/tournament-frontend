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
import { useTournament } from '@/app/components/TournamentProvider'
import AdminButton from '@/app/components/UI/AdminButton'
import { startTournament } from '@/app/service/startTournament'

const joinLeaveTournament = async (tournamentId: number, action: string) => {
	const url = action === 'join' ? `${process.env.NEXT_PUBLIC_JOIN_TOURNAMENT_URL}` :
		`${process.env.NEXT_PUBLIC_LEAVE_TOURNAMENT_URL}`
	const response = await instance({
		url: `${url}/${tournamentId}`,
		method: 'GET'
	})
	return response.data
}


const TournamentPageHeader = () => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const { data: user } = useUser()
	const { tournament, updateTournament } = useTournament();

	const isRegOpen = user?.roles?.some(role => role.role.name === EnumRole.MANAGER)
		&& tournament.status === EnumTournamentStatus.PLANNED

	const isAdmin = user?.roles?.some(role => role.role.name === EnumRole.ADMIN)
	const isTeamAlreadyReg = tournament.teamList.some(team => team.teamId === user?.teamId)

	const handleSubmit = async (action: string) => {
		const response = await joinLeaveTournament(tournament.id, action)
		if (response.tournament) updateTournament(response.tournament)
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
					<div className="flex gap-1 absolute bottom-0 right-0 mr-10 mb-4">
						<div onClick={()=> startTournament(tournament.id)}>
							{isAdmin ? <AdminButton title={dic('Tournament.handleStart')} borderColor="border-buttonColor"/> : ""}
						</div>
						{!isRegOpen ? '' :
							isTeamAlreadyReg ?
								<div onClick={() => handleSubmit('leave')}>
									<PrimaryButton title={dic('Tournament.leaveToTournament')} color="bg-buttonColor" />
								</div> :
								<div onClick={() => handleSubmit('join')}>
									<PrimaryButton title={dic('Tournament.joinToTournament')} color="bg-primary" />
								</div>}
					</div>
				</div>
			</div>
			<Breadcrumbs name={tournament.name} />
		</div>
	)
}

export default TournamentPageHeader



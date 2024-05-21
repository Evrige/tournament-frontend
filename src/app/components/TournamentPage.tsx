"use client"
import React from 'react'
import BackgroundImage from '@/app/components/BackgroundImage'
import { useTranslations } from 'next-intl'
import { ITournament } from '@/app/types/db.interface'
import { getImageUrl } from '@/app/utils/getImageUrl'
import PageMenu from '@/app/components/PageMenu'
import { menuTournamentItems } from '@/app/constants/menuItems'

const TournamentPage = ({ tournament }: { tournament: ITournament }) => {
	const dic = useTranslations()
	return (
		<div>
			<div className="relative">
				<BackgroundImage src={getImageUrl(tournament.game.image)} alt={dic("Tournament.bgImage")} />
				<div className="absolute bottom-0 z-10">
					<h1 className="text-accentText text-4xl">{tournament.name}</h1>
					<PageMenu menuList={menuTournamentItems}/>
				</div>
			</div>
		</div>
	)
}

export default TournamentPage
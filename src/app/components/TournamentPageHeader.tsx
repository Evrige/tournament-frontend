'use client'
import React from 'react'
import BackgroundImage from '@/app/components/BackgroundImage'
import { getImageUrl } from '@/app/utils/getImageUrl'
import PageMenu from '@/app/components/PageMenu'
import { menuTournamentItems } from '@/app/constants/menuItems'
import { useLocale, useTranslations } from 'next-intl'
import { ITournament } from '@/app/types/db.interface'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import { formatDistanceToNow } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import PrimaryButton from '@/app/components/UI/PrimaryButton'

const TournamentPageHeader = ({ tournament }: { tournament: ITournament }) => {
	const dic = useTranslations()
	const localeActive = useLocale()

	return (
		<div className="relative">
			<BackgroundImage src={getImageUrl(tournament.game.image)} alt={dic('Tournament.bgImage')} />
			<div className="absolute bottom-0 z-10 ml-5">
				<h1 className="text-accentText text-4xl">{tournament.name}</h1>
				<PageMenu menuList={menuTournamentItems} />
			</div>
			<Breadcrumbs name={tournament.name} />
		</div>
	)
}

export default TournamentPageHeader
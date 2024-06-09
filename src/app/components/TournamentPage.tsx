'use client'
import React from 'react'
import BackgroundImage from '@/app/components/BackgroundImage'
import { useLocale, useTranslations } from 'next-intl'
import { ITournament } from '@/app/types/db.interface'
import { getImageUrl } from '@/app/utils/getImageUrl'
import PageMenu from '@/app/components/PageMenu'
import { menuTournamentItems } from '@/app/constants/menuItems'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import { IoIosArrowDown } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import TournamentPageHeader from '@/app/components/TournamentPageHeader'
import { format, formatDistanceToNow } from 'date-fns'
import { enGB, ru } from 'date-fns/locale'
import { toPrice } from '@/app/utils/toPrice'
import { TbTrophy } from 'react-icons/tb'
import { ImTrophy } from 'react-icons/im'
import useMapsByGame from '@/app/hooks/useMapsByGame'
import { useTournament } from '@/app/components/Providers/TournamentProvider'

const TournamentPage = () => {
	const dic = useTranslations()
	const path = usePathname()
	const localeActive = useLocale()
	const { tournament, updateTournament } = useTournament();
	const {data: maps} = useMapsByGame(tournament.gameId.toString())
	const infoData = [
		{
			name: dic('Tournament.Info.game'),
			data: tournament.game.name
		},
		{
			name: dic('Tournament.Info.format'),
			data: `${tournament.format}v${tournament.format}`
		},
		{
			name: dic('Tournament.Info.type'),
			data: tournament.type
		},
		{
			name: dic('Tournament.Info.rating'),
			data: `${tournament.minRating || 0} - ${tournament.maxRating || 2000}`
		},
		{
			name: dic('Tournament.Info.start'),
			data: format(new Date(tournament.date), 'dd/MM/yyyy HH:mm')
		},
		{
			name: dic('Tournament.Info.arena'),
			data: tournament?.arena?.name || '-'
		}
	]
	return (
		<div className="mx-5 pt-10">
			<div className="flex justify-between">
				<div className="w-3/4">
					<div className="flex gap-2 text-3xl">
						<p>{dic('Tournament.signUpClose')}</p>
						<p
							className="text-accentText">{formatDistanceToNow(tournament.date, { locale: ru.code === localeActive ? ru : enGB })}</p>
					</div>
					<div className="flex flex-wrap ">
						{infoData.map(info => (
							<div key={info.name} className="w-1/3 p-2">
								<p className="uppercase">{info.name}</p>
								<p className="text-accentText text-lg">{info.data}</p>
							</div>
						))}
					</div>
				</div>
				<div className="w-1/4">
					{!tournament.prizePool ? '' :
						<div className="rounded-[4px] overflow-hidden">
							<div className="flex justify-between items-center bg-bgTable p-3">
								<p className="text-accentText text-lg">{dic('Tournament.prizePool')}</p>
								<p className="text-accentText text-xl ">{toPrice(tournament.prizePool)}</p>
							</div>
							<div className="bg-bgPrimary">
								<div
									className="flex justify-between text-xl p-2 items-center text-accentText  border-b border-b-gray-900">
									<p className="flex items-center">
										<ImTrophy className="text-3xl text-yellow-400 mr-2" />
										{dic('Tournament.Place.1st')}</p>
									<p>{toPrice(tournament.prizePool / 2)}</p>
								</div>
								<div
									className="flex justify-between text-xl p-2 items-center text-accentText  border-b border-b-gray-900">
									<p className="flex items-center">
										<ImTrophy className="text-3xl text-gray-400 mr-2" />
										{dic('Tournament.Place.2nd')}</p>
									<p>{toPrice(tournament.prizePool / 3)}</p>
								</div>
								<div
									className="flex justify-between text-xl p-2 items-center text-accentText  border-b border-b-gray-900">
									<p className="flex items-center">
										<ImTrophy className="text-3xl text-yellow-900 mr-2" />
										{dic('Tournament.Place.3rd')}</p>
									<p>{toPrice(tournament.prizePool / 6)}</p>
								</div>
							</div>
						</div>}
				</div>
			</div>
			<div>
				<div>
					<h1 className="text-accentText text-2xl my-4">{dic('Tournament.Rules.Restrictions.tournamentRestrictions')}</h1>
					<div className="flex flex-col">
						<div className="p-2">
							<p className="uppercase">
								{dic('Tournament.Rules.Restrictions.maps')}</p>
							<p className="text-accentText text-lg">
								{maps?.map((map, index) => (
									<span key={map.id}>{map.name}{maps.length - 1 === index ? "" : ", "}</span>
								))}
							</p>
						</div>
						<div className="p-2">
							<p className="uppercase">
								{dic('Tournament.Rules.Restrictions.minRating')}</p>
							<p className="text-accentText text-lg">
								{tournament.minRating || 0}
							</p>
						</div>
						<div className="p-2">
							<p className="uppercase">
								{dic('Tournament.Rules.Restrictions.maxRating')}</p>
							<p className="text-accentText text-lg">
								{tournament.maxRating || 2000}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h1 className="text-accentText text-2xl my-4">{dic('Tournament.Rules.JoinGame.joinGameTitle')}</h1>
				<p dangerouslySetInnerHTML={{ __html: dic('Tournament.Rules.JoinGame.rule').replace(/\n/g, '<br>')}}></p>
			</div>
		</div>
	)
}

export default TournamentPage
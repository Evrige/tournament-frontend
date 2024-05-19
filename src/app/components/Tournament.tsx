import React from 'react'
import { getUrl } from '@/app/utils/getUrl'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { LiaMedalSolid } from 'react-icons/lia'
import { toPrice } from '@/app/utils/toPrice'
import { FaTicket } from 'react-icons/fa6'
import { AiOutlineTeam } from 'react-icons/ai'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import { format } from 'date-fns'
import Link from 'next/link'
import { ITournament } from '@/app/types/db.interface'
import { useLocale, useTranslations } from 'next-intl'


interface IProps {
  tournament: ITournament
}
const Tournament = ({tournament}: IProps) => {
	const dic = useTranslations()
	const localeActive = useLocale()

	return (
		<Link href={getUrl(`/tournaments/${tournament.id}`, localeActive)} key={tournament.id}>
			<div className="tournament rounded-lg overflow-hidden border border-transparent hover:border-shadowColor">
				<div className="relative">
					<Image src={getImageUrl(tournament?.game?.image || '')}
								 className="banner"
								 width={450} height={450}
								 alt={tournament?.game?.name || ''} />
					<Image src={getImageUrl(tournament?.game?.logo || '')} className="absolute top-1 left-1 rounded-[4px]"
								 width={30} height={30} alt={tournament?.game?.logo || ''} />
					<div
						className="w-full h-[40px] flex gap-1 items-center bg-bgPrimary/70 absolute bottom-0 z-10 pl-2 backdrop-blur-[10px]">
						<LiaMedalSolid className="text-2xl text-primary" />
						<p className="text-lg text-accentText">{toPrice(tournament.prizePool || 0)}</p>
					</div>
				</div>
				<div className="bg-bgPrimary p-3 relative z-10">
					<p className="text-xl text-accentText mb-1">{tournament.name}</p>
					<div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
						<div className="flex gap-1 items-center">
							<FaTicket className="text-lg" />{!tournament.minRating && !tournament.maxRating ?
							`${dic('Tournament.enter')}`
							: `${tournament.minRating || 0} - ${tournament.maxRating || 2000}`}
						</div>
						<p>{tournament.format}v{tournament.format}</p>
						<div className="flex gap-1 items-center">0/{tournament.teamCount} <AiOutlineTeam
							className="text-lg" /></div>
					</div>
					<div className="flex justify-between mt-2">
						<div className="flex gap-1 items-center"><MdDateRange
							className="text-lg" />{format(new Date(tournament.date), 'dd/MM/yyyy HH:mm')}</div>
						<div className="flex gap-1 items-center">{tournament?.arena?.name || "Online"}<MdLocationOn
							className="text-lg" /></div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Tournament
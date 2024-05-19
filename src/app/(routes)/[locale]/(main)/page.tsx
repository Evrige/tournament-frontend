'use client'
import { useLocale, useTranslations } from 'next-intl'
import useTournaments from '@/app/hooks/useTouraments'
import { getImageUrl } from '@/app/utils/getImageUrl'
import Image from 'next/image'
import { toPrice } from '@/app/utils/toPrice'
import { LiaMedalSolid } from 'react-icons/lia'
import { FaTicket } from 'react-icons/fa6'
import { AiOutlineTeam } from 'react-icons/ai'
import { format } from 'date-fns'
import { MdDateRange, MdLocationOn } from 'react-icons/md'

export default function Home() {
	const dic = useTranslations()
	const localeActive = useLocale()


	// const { theme, setTheme } = useTheme()
	// const queryClient = useQueryClient();
	const { data: tournaments, isLoading } = useTournaments()
	if (isLoading) {
		return (
			<div>Loading...</div>
		)
	}
	console.log(tournaments)
	return (
		<div className="pl-[200px] flex gap-5 flex-wrap mt-2">
			{tournaments?.map(tournament => {
				return (
					<div key={tournament.id} className="cursor-pointer rounded-lg">
						<div className="relative">
							<Image src={getImageUrl(tournament?.game?.image || '')} width={450} height={450}
										 alt={tournament?.game?.name || ''} />
							<Image src={getImageUrl(tournament?.game?.logo || '')} className="absolute top-1 left-1 rounded-[4px]"
										 width={30} height={30} alt={tournament?.game?.logo || ''} />
							<div
								className="w-full h-[40px] flex gap-1 items-center bg-bgPrimary/70 absolute bottom-0 z-10 pl-2 backdrop-blur-[10px]">
								<LiaMedalSolid className="text-2xl text-primary" />
								<p className="text-lg text-accentText">{toPrice(tournament.prizePool || 0)}</p>
							</div>
						</div>
						<div className="bg-bgPrimary p-3">
							<p className="text-xl text-accentText mb-1">{tournament.name}</p>
							<div className="flex justify-between border-b-[1px] border-gray-700 pb-2">
								<div className="flex gap-1 items-center">
									<FaTicket className="text-lg" />{!tournament.minRating && !tournament.maxRating ?
									`${dic('Tournament.enter')}`
									: `${tournament.minRating || 0} - ${tournament.maxRating || 2000}`}
								</div>
								<p>{tournament.format}v{tournament.format}</p>
								<div className="flex gap-1 items-center">0/{tournament.teamCount} <AiOutlineTeam className="text-lg"/></div>
							</div>
							<div className="flex justify-between mt-2">
								<div className="flex gap-1 items-center"><MdDateRange className="text-lg"/>{format(new Date(tournament.date), 'dd/MM/yyyy HH:mm')}</div>
								<div className="flex gap-1 items-center">{tournament?.arena?.name || "Online"}<MdLocationOn className="text-lg"/></div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

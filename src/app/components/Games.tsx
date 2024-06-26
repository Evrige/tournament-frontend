import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import useGames from '@/app/hooks/useGames'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'
import Link from 'next/link'
import Loader from '@/app/(routes)/loader'

const Games = () => {
	const dic = useTranslations()

	const { data: games, error, isLoading } = useGames()
	return (
		<div className="flex flex-col gap-2">
			<p>{dic('Aside.games')}</p>
			{isLoading ? <Loader/> :
				<div className="flex gap-2">
					{games?.map(game => <div key={game.id}>
						<Link href={`/games/${game.name}`}>
							<Image src={getImageUrl(game.logo)} className="rounded-[4px] cursor-pointer" alt={dic('Game.logo')}
										 width={30} height={30} />
						</Link>
				</div>)}
			</div>}
		</div>
	)
}

export default Games
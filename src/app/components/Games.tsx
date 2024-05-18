import React from 'react'
import { useTranslations } from 'next-intl'
import useGames from '@/app/hooks/useGames'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'

const Games = () => {
	const dic = useTranslations()

	const { data: games, error, isLoading } = useGames()
	return (
		<>
			{isLoading ? <div>Load...</div> : <div className="flex gap-2">
				{games?.map(game => <div key={game.id}>
				<Image src={getImageUrl(game.logo)} className="rounded-[4px]" alt={dic('Game.logo')} width={30} height={30} />
			</div>)}
			</div>}
		</>
	)
}

export default Games
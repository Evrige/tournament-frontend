import React from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'

const TeamUserLogo = ({url, alt}: {url: string, alt: string}) => {
	return (
		<div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
			{url ? 	<Image src={getImageUrl(url)}
										 width={64} height={64}
										 className="w-full h-full object-cover"
										 alt={alt} /> : ""}
		</div>
	)
}

export default TeamUserLogo
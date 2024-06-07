import React from 'react'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'

const TeamUserLogo = ({url, alt, size}: {url: string, alt: string, size?: string}) => {
	if (url === "") return <div></div>

	return (
		<div className={`${size ? size : "w-10 h-10" } rounded-full overflow-hidden flex items-center justify-center`}>
			<Image src={url.startsWith('http') ? url : getImageUrl(url)}
										 width={200} height={200}
										 className="w-full h-full object-cover"
										 alt={alt} />
		</div>
	)
}

export default TeamUserLogo
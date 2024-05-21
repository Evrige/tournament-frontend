import React from 'react'
import Image from 'next/image'

interface IProps {
	src: string
  alt: string
}

const BackgroundImage = ({src, alt}: IProps) => {
	return (
		<>
			<Image src={src} width={2000} height={2000}
						 className="h-[500px] w-full object-cover object-top" alt={alt} />
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-bgSecondary z-10"></div>
		</>
	)
}

export default BackgroundImage
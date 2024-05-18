import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const Logo = () => {
	const dic = useTranslations()
	return (
		<Link href={"/"}>
			<Image src="/images/logo.png" alt={dic("Logo.alt")} width={200} height={200} className="max-lg:w-[110px]"></Image>
		</Link>

	)
}

export default Logo
'use client'
import React from 'react'
import { asideItems } from '@/app/constants/mainItems'
import { getUrl } from '@/app/utils/getUrl'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Games from '@/app/components/Games'

const Aside = () => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const path = usePathname()

	return (
		<aside className="bg-bgSecondary w-[200px] h-screen fixed border-r-[1px] border-r-gray-700">
			<ul className="flex flex-col text-[18px] p-2">
				{asideItems.map(item => {
					const isActive = path === getUrl(item.link, localeActive)

					return (
						<li key={item.name}
								className={`flex gap-2 items-center mx-1 my-3 p-2 rounded-[8px] 
									${isActive && item.icon ? 'bg-primary text-bgSecondary' : 'hover:bg-bgPrimary hover:text-accentText'}`}>
							{item.icon ?
								<>
									<span className="text-2xl">
												{item.icon}
										</span>
									<Link href={item.link}>{dic(item.name)}</Link>
								</> : <div key={item.name}><Games /></div>}
						</li>
					)
				})}
			</ul>
		</aside>
	)
}

export default Aside
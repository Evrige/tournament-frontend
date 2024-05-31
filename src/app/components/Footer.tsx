import React from 'react'
import Logo from '@/app/components/Logo'
import { menuItems, moreItems } from '@/app/constants/headerItems'
import MenuItemLink from '@/app/components/UI/MenuItemLink'
import { socialItems } from '@/app/constants/menuItems'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { getUrl } from '@/app/utils/getUrl'

const Footer = () => {
	const localeActive = useLocale()
	const dic = useTranslations()
	return (
		<footer className="bg-bgPrimary w-full pl-[220px] pt-5 border-t border-t-gray-700">
			<div className="flex justify-between flex-wrap mb-5">
				<div>
					<Logo />
					<p className="mt-3 ml-2 text-xl italic">{dic("Footer.mtg")}</p>
				</div>
				<div className="flex flex-col gap-2">
					{menuItems.map(menuItem => (
						<MenuItemLink key={menuItem.name} title={menuItem.name} link={menuItem.link} />
					))}
				</div>
				<div className="flex flex-col gap-2">
					{moreItems.map(menuItem => (
						<MenuItemLink key={menuItem.name} title={menuItem.name} link={menuItem.link} />
					))}
				</div>
				<div>
					<div className="flex gap-2 flex-wrap mt-5 max-w-[100px] lg:mr-16">
						{socialItems.map(socialItem => (
							<Link key={socialItem.name} title={dic(socialItem.name)}
										href={getUrl(socialItem.link, localeActive)}
										className={`text-2xl hover:${socialItem.color}`}>
								{socialItem.icon}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="text-center">Made with 🤍 by Evrige</div>
		</footer>
	)
}

export default Footer
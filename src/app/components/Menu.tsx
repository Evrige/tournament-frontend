import React from 'react'
import { menuItems } from '@/app/constants/headerItems'
import MenuItemDropDown from '@/app/components/UI/MenuItemDropDown'
import MenuItemLink from '@/app/components/UI/MenuItemLink'
import Link from 'next/link'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { useLocale, useTranslations } from 'next-intl'

const Menu = () => {
	const dic = useTranslations()
	const localeActive = useLocale()

	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<nav>
				<ul className="flex gap-5">
					{menuItems.map(item => (
						item.link === 'dropDown' ?
							<MenuItemDropDown key={item.title} title={dic(item.title)} /> :
							<MenuItemLink key={item.title} link={item.link} title={dic(item.title)} />
					))}
				</ul>
			</nav>
			<div>
				<button
					className="hover:bg-bgPrimary hover:text-accentText py-2 px-3 text-xl text-primary rounded-[8px] mr-5 max-lg:text-sm">
					<Link href={`/${localeActive}/login`} locale={localeActive}>{dic('Menu.signIn')}</Link>
				</button>
				<button
					className="hover:bg-accentText bg-primary py-2 px-3 text-xl text-bgSecondary rounded-[8px] max-lg:text-sm">
					<Link href={`/${localeActive}/registration`} locale={localeActive}>{dic('Menu.signUp')}</Link>
				</button>
			</div>
			<LocaleSwitcher />
		</div>
	)
}

export default Menu
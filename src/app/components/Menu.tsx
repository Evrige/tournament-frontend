import React from 'react'
import { menuItems, moreItems } from '@/app/constants/headerItems'
import MenuItemDropDown from '@/app/components/UI/MenuItemDropDown'
import MenuItemLink from '@/app/components/UI/MenuItemLink'
import Link from 'next/link'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { useTranslations } from 'next-intl'
import useGames from '@/app/hooks/useGames'
import Loader from '@/app/(routes)/loader'

const Menu = () => {
	const dic = useTranslations()
	const { data: games, error, isLoading } = useGames()

	if(isLoading) return <Loader/>
	menuItems[2].list = games
	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<nav>
				<div className="flex gap-5">
					{menuItems.map(item => (
						item.link === 'dropDown' ?
							<MenuItemDropDown key={item.name} title={item.name} list={item.list}/> :
							<MenuItemLink key={item.name} link={item.link} title={item.name} />
					))}
				</div>
			</nav>
			<div>
				<button
					className="hover:bg-bgPrimary hover:text-accentText py-2 px-3 text-xl text-primary rounded-[8px] mr-5 max-lg:text-sm">
					<Link href="/login">{dic('Menu.signIn')}</Link>
				</button>
				<button
					className="hover:bg-accentText bg-primary py-2 px-3 text-xl text-bgSecondary rounded-[8px] max-lg:text-sm">
					<Link href="/registration">{dic('Menu.signUp')}</Link>
				</button>
			</div>
			<LocaleSwitcher />
		</div>
	)
}

export default Menu
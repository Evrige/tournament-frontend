'use client'
import React, { useEffect, useState } from 'react'
import { menuItems } from '@/app/constants/headerItems'
import MenuItemDropDown from '@/app/components/UI/MenuItemDropDown'
import MenuItemLink from '@/app/components/UI/MenuItemLink'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { useLocale, useTranslations } from 'next-intl'
import Logo from '@/app/components/Logo'
import Link from 'next/link'
import { refreshToken } from '@/app/service/refreshToken'
import { useConnectSocket } from '@/app/hooks/useConnectSocket'
import { IUser } from '@/app/types/db.interface'
import { useQuery } from '@tanstack/react-query'

import axios from 'axios';

const fetchEvents = async () => {
	try {
		const response = await axios.get('http://localhost:5000/api/sse', { withCredentials: true });
		return response.data;
	} catch (error) {
		throw new Error('Ошибка загрузки событий');
	}
};

const Header = () => {
	const dic = useTranslations()
	const localeActive = useLocale()


	const { data: events, isLoading } = useQuery({queryKey:['events'], queryFn: fetchEvents});

	if (isLoading) return <div>Loading...</div>;
	console.log(events)

	// const { data: user, isLoading: userLoading } = useQuery({queryKey: ['user'], queryFn: refreshToken});
	//
	// // Подписка на сокет для обновлений пользователя
	// const userSocketData = useConnectSocket(user?.user?.id ?? 0);
	// console.log(userSocketData)
	// if (userLoading) return <div>Loading...</div>;

	// Если userSocketData undefined, установим его в user
	// const currentUser: IUser = userSocketData || user.user;
	// console.log(currentUser)



	return (
		<header className="bg-bgSecondary flex items-center justify-between h-[85px] px-7 fixed w-full">
			<Logo />
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
					{/*{userLoading ? <div>load</div> : <div>{currentUser?.nickname} - {currentUser?.name}</div>}*/}
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
		</header>
	)
}

export default Header
'use client'
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import Logo from '@/app/components/Logo'
import { useQuery } from '@tanstack/react-query'
import useSSE from '@/app/hooks/useSSE'
import { refreshToken } from '@/app/service/refreshToken'
import UserMenu from '@/app/components/UserMenu'
import Menu from '@/app/components/Menu'
import { IoLogOutOutline } from 'react-icons/io5'
import useLogout from '@/app/hooks/useLogout'


const Header = () => {
	const dic = useTranslations()
	const localeActive = useLocale()

	const { data: user, isLoading: userLoading } = useQuery({queryKey: ['user'], queryFn: refreshToken});

	const sseData = useSSE()

	const currentUser = sseData || user?.user;

	// if (userLoading) return <div>Загрузка...</div>;


	// const logout = useLogout()
	return (
		<header className="bg-bgSecondary flex items-center justify-between h-[85px] px-7 fixed w-full">
			<Logo />
			{currentUser ? <UserMenu user={currentUser}/> : <Menu/>}
		</header>
	)
}

export default Header
'use client'
import React from 'react'
import Logo from '@/app/components/Logo'
import useSSE from '@/app/hooks/useSSE'
import UserMenu from '@/app/components/UserMenu'
import Menu from '@/app/components/Menu'
import useRefresh from '@/app/hooks/useRefresh'
import useUser from '@/app/hooks/useUser'


const Header = () => {
	useRefresh()
	const sseData = useSSE()
	const { data: user, isLoading: userLoading } = useUser()

	const currentUser = sseData || user;

	return (
		<header className="bg-bgSecondary flex items-center justify-between h-[85px] px-7 fixed w-full border-b-[1px] border-b-gray-700 z-50">
			<Logo />
			{currentUser ? <UserMenu user={currentUser}/> : <Menu/>}
		</header>
	)
}

export default Header
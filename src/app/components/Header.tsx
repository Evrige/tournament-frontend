'use client'
import React, { useEffect } from 'react'
import Logo from '@/app/components/Logo'
import useSSE from '@/app/hooks/SSE/useSSE'
import UserMenu from '@/app/components/UserMenu'
import Menu from '@/app/components/Menu'
import useRefresh from '@/app/hooks/useRefresh'
import useUserData from '@/app/hooks/useUserData'
import { useUser } from '@/app/components/Providers/UserProvider'
import { IUser } from '@/app/types/db.interface'


const Header = () => {
	useRefresh()
	const userSse = useSSE()
	const { data: userData} = useUserData()
	const {user, updateUser} = useUser()

	useEffect(() => {
		updateUser(userSse || userData || null)
	}, [userData, userSse])

	return (
		<header className="bg-bgSecondary flex items-center justify-between h-[85px] px-7 fixed w-full border-b-[1px] border-b-gray-700 z-50">
			<Logo />
			{user ? <UserMenu/> : <Menu/>}
		</header>
	)
}

export default Header
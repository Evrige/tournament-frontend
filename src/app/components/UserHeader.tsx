"use client"
import React from 'react'
import BackgroundImage from '@/app/components/BackgroundImage'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import Image from 'next/image'
import { getImageUrl } from '@/app/utils/getImageUrl'
import PageMenu from '@/app/components/PageMenu'
import { menuUserItems } from '@/app/constants/menuItems'
import ProfileStats from '@/app/components/ProfileStats'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import { useTranslations } from 'next-intl'
import useUser from '@/app/hooks/useUser'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'

const UserHeader = () => {
	const dic = useTranslations()
	const { data: user, isLoading: userLoading } = useUser()

	return (
		<div className="relative">
			<BackgroundImage src="/images/profile-back.jpg" alt={dic('User.Profile.BackgroundAlt')} />
			<Breadcrumbs />
			<div className="absolute w-full bottom-0 pl-4 z-20">
				<div className="flex items-center gap-2">
					<TeamUserLogo url={user?.avatar || ""} alt={dic('User.Profile.avatar')}/>
					<p className="text-3xl text-accentText">{user?.nickname}</p>
				</div>
				<PageMenu menuList={menuUserItems} />
				<div className="flex justify-between">
					<div className="flex flex-col gap-2 ml-3">
						<h1 className="text-accentText text-2xl uppercase">{dic('User.Main.main')}</h1>
						<div className="flex gap-10 flex-wrap	">
							<ProfileStats name={'0'}
														subName={dic('User.Main.matches')}
														icon={<RiGameLine />} />
							<ProfileStats name={'0'}
														subName={dic('User.Main.tournamentsCount')}
														icon={<SlTrophy />} />
							<ProfileStats name={'0'}
														subName={dic('User.Main.winRate')}
														icon={<FaChampagneGlasses />} />
						</div>
					</div>
					<div className="pr-10">
						<h1 className="text-accentText text-2xl uppercase mb-3">{dic('User.Main.achievements')}</h1>
						<p>{dic('User.Main.achievementsNo')}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserHeader
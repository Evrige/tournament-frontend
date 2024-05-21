'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import useUser from '@/app/hooks/useUser'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import { menuUserItems } from '@/app/constants/menuItems'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import ProfileStats from '@/app/components/ProfileStats'
import BackgroundImage from '@/app/components/BackgroundImage'
import PageMenu from '@/app/components/PageMenu'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrimaryButton from '@/app/components/UI/PrimaryButton'


const Page = () => {
	const dic = useTranslations()
	const path = usePathname()
	const localeActive = useLocale()

	const { data: user, isLoading: userLoading } = useUser()

	const currentPath = path.split('/').splice(2)
	if (userLoading) return <div>Load</div>

	return (
		<div className="bg-bgSecondary h-screen">
			<div className="relative">
				<BackgroundImage src="/images/profile-back.jpg" alt={dic('User.Profile.BackgroundAlt')}/>
				<Breadcrumbs/>
				<div className="absolute w-full bottom-0 ml-4 z-20">
					<div className="flex items-center gap-2">
						<Image src={getImageUrl(user?.avatar || '')} alt={dic('User.Profile.avatar')} width={100} height={100} />
						<p className="text-3xl text-accentText">{user?.nickname}</p>
					</div>
					<PageMenu menuList={menuUserItems}/>
					<div className="flex justify-between">
						<div className="flex flex-col gap-2 ml-3">
							<h1 className="text-accentText text-2xl uppercase">{dic('User.Main.main')}</h1>
							<div className="flex gap-10">
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
						<div className="mr-10">
							<h1 className="text-accentText text-2xl uppercase mb-3">{dic('User.Main.achievements')}</h1>
							<p>{dic('User.Main.achievementsNo')}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col bg-bgPrimary rounded-[8px] max-w-[300px] m-2">
				<h1 className="text-accentText text-2xl uppercase p-3  rounded-t-[8px] bg-bgTable">
					{dic("User.Team.team")}</h1>
				{user?.teamId ? <div className="flex gap-3 items-center border-b py-3 pl-2 border-b-bgSecondary">
					<div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
						<Image src={getImageUrl(user?.team?.logo || "")}
									 width={64} height={64}
									 className="w-full h-full object-cover"
									 alt={dic("User.Team.teamLogo")} />
					</div>
					<p className="text-xl text-accentText">{user?.team?.name}</p>
				</div> : <p>{dic("User.Team.teamNo")}</p>}
				<PrimaryButton title={dic("User.Team.leaveTeam")}/>
			</div>
		</div>
	)
}

export default Page
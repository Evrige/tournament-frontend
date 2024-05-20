'use client'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { IUser } from '@/app/types/db.interface'
import useSSE from '@/app/hooks/useSSE'
import useUser from '@/app/hooks/useUser'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import { menuItems } from '@/app/constants/userItems'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import ProfileStats from '@/app/components/ProfileStats'


const Page = () => {
	const queryClient = useQueryClient()
	const dic = useTranslations()
	const path = usePathname()
	const localeActive = useLocale()

	const { data: user, isLoading: userLoading } = useUser()

	const currentPath = path.split('/').splice(2)
	if (userLoading) return <div>Load</div>

	return (
		<div className="bg-bgSecondary h-screen">
			<div className="relative">
				<Image src="/images/profile-back.jpg" width={2000} height={2000}
							 className="h-[500px] w-full object-cover object-top" alt={dic('User.Profile.BackgroundAlt')} />
				<div className="absolute inset-0 bg-bgPrimary opacity-80 backdrop-blur z-10"></div>
				<div className="absolute flex w-full top-0 z-20 mt-3 ml-3">
					{currentPath.map((pathName, index) => {
						const isLast = index === currentPath.length - 1
						return (
							<div key={pathName} className="flex items-center">
								<Link href={getUrl(`/${pathName}`, localeActive)}
											className={`uppercase text-lg ${isLast ? 'text-accentText' : ''}`}>{pathName}</Link>
								{!isLast ? <IoIosArrowDown className="text-primary text-xl -rotate-90" /> : ''}
							</div>
						)
					})}
				</div>
				<div className="absolute w-full bottom-0 z-20">
					<div className="flex items-center gap-2">
						<Image src={getImageUrl(user?.avatar || '')} alt={dic('User.Profile.avatar')} width={100} height={100} />
						<p className="text-3xl text-accentText">{user?.nickname}</p>
					</div>
					<div className="flex gap-2 uppercase ml-3 my-10">
						{menuItems.map(menuItem => {
							const isActive = getUrl(menuItem.link, localeActive) === path
							return (
								<Link href={getUrl(menuItem.link, localeActive)}
											className={`pb-2 px-2 hover:text-accentText ${isActive ? 'border-b border-primary text-primary' : ''}`}
											key={menuItem.link}>
									{dic(menuItem.name)}
								</Link>
							)
						})}
					</div>
					<div className="flex justify-between">
						<div className="flex flex-col gap-2 ml-3">
							<h1 className="text-accentText text-2xl uppercase">{dic("User.Main.main")}</h1>
							<div className="flex gap-10">
								<ProfileStats name={"0"}
															subName={dic("User.Main.matches")}
															icon={<RiGameLine />} />
								<ProfileStats name={"0"}
															subName={dic("User.Main.tournamentsCount")}
															icon={<SlTrophy />} />
								<ProfileStats name={"0"}
															subName={dic("User.Main.winRate")}
															icon={<FaChampagneGlasses />} />
							</div>
						</div>
						<div className="mr-10">
							<h1 className="text-accentText text-2xl uppercase mb-3">{dic("User.Main.achievements")}</h1>
							<p>{dic("User.Main.achievementsNo")}</p>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h1 className="text-accentText text-2xl uppercase ">
					{dic("User.Team.team")}
					{user?.teamId ? <div className="flex gap-3 items-center">
						<Image src={getImageUrl(user?.team?.logo || "")}
									 width={64} height={64}
									 className="rounded-full object-center object-cover"
									 alt={dic("User.Team.teamLogo")}/>
						<p>{user?.team?.name}</p>
					</div> : <p>{dic("User.Team.teamNo")}</p>}
				</h1>
			</div>
		</div>
	)
}

export default Page
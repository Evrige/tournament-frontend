'use client'
import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { IUser } from '@/app/types/db.interface'
import useSSE from '@/app/hooks/useSSE'
import useUser from '@/app/hooks/useUser'
import { IoIosArrowDown } from 'react-icons/io'


const Page = () => {
	const queryClient = useQueryClient()
	const dic = useTranslations()
	const path = usePathname()

	const { data: user, isLoading: userLoading } = useUser()

	const currentPath = path.split('/').splice(2)
	if (userLoading) return <div>Load</div>
	console.log(currentPath)
	return (
		<div>
			<div className="relative">
				<Image src="/images/profile-back.jpg" width={2000} height={2000}
							 className="h-[300px] w-full object-cover object-top " alt={dic('User.Profile.BackgroundAlt')}/>
				<div className="absolute inset-0 bg-bgPrimary opacity-80 backdrop-blur z-10"></div>
				<div className="absolute flex w-full top-0 bg-bgPrimary opacity-90 z-20 pt-3 pl-3">
					{currentPath.map((pathName, index) => {
						const isLast = index === currentPath.length - 1;
						return (
							<div key={pathName} className="flex items-center">
								<p className={`uppercase text-lg ${isLast ? "text-accentText" : ""}`}>{pathName}</p>
								{!isLast ? <IoIosArrowDown className="text-primary text-xl -rotate-90"/> : ""}
							</div>
						)})}

				</div>
				<div className="absolute w-full bottom-0 z-20">
					<div className="flex items-center gap-2">
						<Image src={getImageUrl(user?.avatar || "")} alt={dic('User.Profile.avatar')} width={100} height={100}/>
						<p className="text-3xl text-accentText">{user?.nickname}</p>
					</div>


				</div>
			</div>
		</div>
	)
}

export default Page
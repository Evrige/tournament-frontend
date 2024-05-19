'use client'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { IUser } from '@/app/types/db.interface'


const Page = () => {
	const queryClient = useQueryClient()
	const dic = useTranslations()
	const path = usePathname()
	const data = queryClient.getQueryData(['user'])
	// @ts-ignore
	const user = data?.user as IUser
	const currentPath = path.split('/').splice(2)
	console.log(getImageUrl(user?.avatar))
	return (
		<div>
			<div className="relative">
				<Image src="/images/profile-back.jpg" width={2000} height={2000}
							 className="h-[300px] w-full object-cover object-top " alt={dic('User.Profile.BackgroundAlt')}/>
				<div className="absolute inset-0 bg-bgPrimary opacity-80 backdrop-blur z-10"></div>
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
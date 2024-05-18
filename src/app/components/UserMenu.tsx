import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { IUser } from '@/app/types/db.interface'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FaRegMessage } from 'react-icons/fa6'
import Image from 'next/image'

interface IProps {
	user: IUser
}

const UserMenu = ({ user }: IProps) => {
	const dic = useTranslations()
	const localeActive = useLocale()

	console.log(user)
	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<LocaleSwitcher />
			<FaRegMessage size="20px" />
			<IoMdNotificationsOutline size="24px" />
			<div className="flex items-center gap-2">
				<Image src={""} alt={dic('Menu.User.avatar')} width={40} height={40}
							 className="rounded-full h-10 w-10 bg-primary" />
				<p className="text-[18px] hover:text-accentText cursor-pointer">{user.nickname}</p>
			</div>
		</div>
	)
}

export default UserMenu
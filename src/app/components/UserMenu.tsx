import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { IUser } from '@/app/types/db.interface'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { FaRegMessage } from 'react-icons/fa6'
import Image from 'next/image'
import useLogout from '@/app/hooks/useLogout'
import { IoLogOutOutline } from 'react-icons/io5'
import { getImageUrl } from '@/app/utils/getImageUrl'
import { useRouter } from 'next/navigation'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'

interface IProps {
	user: IUser
}

const UserMenu = ({ user }: IProps) => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const logout = useLogout()
	const router = useRouter()
	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<LocaleSwitcher />
			<FaRegMessage size="20px" />
			<IoMdNotificationsOutline size="24px" />
			<div className="flex items-center gap-2">
				<TeamUserLogo url={user?.avatar || ""} alt={dic('Menu.User.avatar')}/>
				<p className="text-[18px] hover:text-accentText cursor-pointer">{user.nickname}</p>
				<IoLogOutOutline size="24px" onClick={()=> {logout.mutate(); router.replace("/")}}/>
			</div>
		</div>
	)
}

export default UserMenu
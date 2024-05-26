import React, { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { EnumInviteStatus, IUser } from '@/app/types/db.interface'
import { IoMdClose, IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io'
import { FaCheck, FaRegMessage } from 'react-icons/fa6'
import useLogout from '@/app/hooks/useLogout'
import { IoLogOutOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import useSSEInvites from '@/app/hooks/useSSEInvites'
import { invitesService } from '@/app/service/invites'
import { successNotify } from '@/app/utils/notification/successNotify'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import useUser from '@/app/hooks/useUser'

interface IProps {
	user: IUser
}

const UserMenu = () => {
	const dic = useTranslations()
	const logout = useLogout()
	const router = useRouter()
	const invites = useSSEInvites() || []
	const [dropDownIsActive, setDropDownIsActive] = useState(false)
	const dropDownRef = useRef<HTMLDivElement>(null)
	const { data: user } = useUser()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropDownRef?.current?.contains(event.target as Node))
				setDropDownIsActive(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropDownRef])

	const handleResponseInvite = async (id: number, status: EnumInviteStatus) => {
		const response = await invitesService('PUT', { id, status })
		if (status !== EnumInviteStatus.DECLINED) {
			if (response.statusCode === 200) successNotify(response.message)
			else errorNotify(response.message)
		}
	}

	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<LocaleSwitcher />
			<FaRegMessage className="text-xl" />
			<div className="relative cursor-pointer" ref={dropDownRef}>
				<div onClick={(event) => {
					event.stopPropagation()
					setDropDownIsActive(!dropDownIsActive)
				}}>
					{invites?.length > 0 ? <><IoMdNotifications className="text-2xl" />
						<span className="absolute -top-0.5 -right-0.5 bg-primary text-[10px] text-bgSecondary rounded-full px-1">
							{invites.length}</span></> : <IoMdNotificationsOutline className="text-2xl" />}
				</div>
				<ul
					className={`${dropDownIsActive ? 'absolute' : 'hidden'} w-[300px] top-16 right-4 bg-bgPrimary rounded-[8px] p-2`}>
					{invites.length > 0 ? invites.map(invite =>
						<li key={invite.id} className="flex justify-between items-center pb-1 border-b border-b-gray-700"
								title={`${dic('Menu.Notification.inviteInTeam')} ${invite.team.name}`}>
							<div className="max-w-[250px]">
								<p>{dic('Menu.Notification.inviteInTeam')}</p>
								<span className="text-accentText"> {invite.team.name}</span>
							</div>
							<div className="flex gap-1 items-center">
								{!user?.teamId ? <FaCheck className="text-lg text-primary"
																				 onClick={() => handleResponseInvite(invite.id, EnumInviteStatus.ACCEPTED)} /> : ''}
								<IoMdClose className="text-xl text-red-500"
													 onClick={() => handleResponseInvite(invite.id, EnumInviteStatus.DECLINED)} />
							</div>
						</li>
					) : <li>{dic('Menu.Notification.noNotification')}</li>}
				</ul>
			</div>
			<div className="flex items-center gap-2">
				<TeamUserLogo url={user?.avatar || ''} alt={dic('Menu.User.avatar')} />
				<p className="text-[18px] hover:text-accentText cursor-pointer">{user?.nickname}</p>
				<IoLogOutOutline size="24px" onClick={() => {
					logout.mutate()
					router.replace('/')
				}} />
			</div>
		</div>
	)
}

export default UserMenu
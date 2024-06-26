import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'
import { EnumInviteStatus, IInvites } from '@/app/types/db.interface'
import { IoMdClose, IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io'
import { FaCheck, FaRegMessage } from 'react-icons/fa6'
import useLogout from '@/app/hooks/useLogout'
import { IoLogOutOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import useSSEInvites from '@/app/hooks/SSE/useSSEInvites'
import { invitesService } from '@/app/service/invites'
import { successNotify } from '@/app/utils/notification/successNotify'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import { useUser } from '@/app/components/Providers/UserProvider'
import { IAllInvites } from '@/app/types/invites.interface'

const UserMenu = () => {
	const dic = useTranslations()
	const logout = useLogout()
	const router = useRouter()
	const invites = useSSEInvites() || {} as IInvites
	const [dropDownIsActive, setDropDownIsActive] = useState(false)
	const dropDownRef = useRef<HTMLDivElement>(null)
	const { user } = useUser()
	const [allInvites, setAllInvites] = useState<IAllInvites[]>([]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropDownRef?.current?.contains(event.target as Node))
				setDropDownIsActive(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropDownRef])

	const handleResponseInvite = async (id: number, status: EnumInviteStatus, type: string) => {
		const response = await invitesService('PUT', { id, status, type })
		if (status !== EnumInviteStatus.DECLINED) {
			if (response.statusCode === 200) {
				successNotify(response.message)
				setAllInvites(prevInvites => prevInvites.filter(invite => invite.id !== id && invite.type === type));
			}
			else errorNotify(response.message)
		}
	}

	useEffect(() => {
		const combinedInvites = [
			...(invites.teamInvites || []).map(invite => ({ ...invite, type: 'team' })),
			...(invites.friendInvites || []).map(invite => ({ ...invite, type: 'friend' }))
		].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as IAllInvites[];

		setAllInvites(combinedInvites);
	}, [invites]);

	return (
		<div className="flex items-center gap-10 max-md:hidden max-lg:text-sm">
			<LocaleSwitcher />
			<FaRegMessage className="text-xl" />
			<div className="relative cursor-pointer" ref={dropDownRef}>
				<div onClick={(event) => {
					event.stopPropagation()
					setDropDownIsActive(!dropDownIsActive)
				}}>
					{allInvites.length > 0 ? <><IoMdNotifications className="text-2xl" />
						<span className="absolute -top-0.5 -right-0.5 bg-primary text-[10px] text-bgSecondary rounded-full px-1">
							{allInvites.length}</span></> : <IoMdNotificationsOutline className="text-2xl" />}
				</div>
				<ul
					className={`${dropDownIsActive ? 'absolute' : 'hidden'} w-[300px] top-16 right-4 bg-bgPrimary rounded-[8px] p-2`}>
					{allInvites.length > 0 ? allInvites.map(invite => (
						<li key={invite.id} className="flex justify-between items-center pb-1 border-b border-b-gray-700"
								title={`${dic('Menu.Notification.inviteInTeam')} ${invite.team?.name || invite.user1?.nickname}`}>
							<div className="max-w-[250px]">
								<p>{invite.type === 'team' ? dic('Menu.Notification.inviteInTeam') : dic('Menu.Notification.inviteInFriend')}</p>
								<span className="text-accentText"> {invite.team?.name || invite.user1?.nickname}</span>
							</div>
							<div className="flex gap-1 items-center">
								{(invite.type !== 'team' || !user?.teamId) && (
									<FaCheck
										className="text-lg text-primary cursor-pointer"
										onClick={() => handleResponseInvite(invite.id, EnumInviteStatus.ACCEPTED, invite.type)}
									/>
								)}
								<IoMdClose className="text-xl text-red-500" onClick={() =>
									handleResponseInvite(invite.id, EnumInviteStatus.DECLINED, invite.type)} />
							</div>
						</li>
					)) : <li>{dic('Menu.Notification.noNotification')}</li>}
				</ul>
			</div>
			<div className="flex items-center gap-2">
				<TeamUserLogo url={user?.avatar || ''} size="w-12 h-12" alt={dic('Menu.User.avatar')} />
				<p className="text-[18px] hover:text-accentText cursor-pointer">{user?.nickname}</p>
				<IoLogOutOutline className="text-2xl cursor-pointer" onClick={() => {
					logout.mutate()
					router.replace('/')
				}} />
			</div>
		</div>
	)
}

export default UserMenu

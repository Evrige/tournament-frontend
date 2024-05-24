import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import { IoSearchSharp } from 'react-icons/io5'
import { findUsersByNickname } from '@/app/service/findUsersByNickname'
import { IUser } from '@/app/types/db.interface'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { MdAddBox } from 'react-icons/md'
import useUser from '@/app/hooks/useUser'
import { invitesService } from '@/app/service/invites'

interface IProps {
	handleClose: () => void;
}

const SendInvites = ({ handleClose }: IProps) => {
	const dic = useTranslations()

	const [usersList, setUsersList] = useState<IUser[]>([])
	const [searchInput, setSearchInput] = useState<string>()
	const [sentInvites, setSentInvites] = useState<Set<number>>(new Set())
	const { data: userData } = useUser()
	useEffect(() => {
		document.body.style.overflow = 'hidden'

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [])

	const debounce = (fn: (...args: any[]) => any, ms: number) => {
		let timeout: ReturnType<typeof setTimeout>
		return function(this: any, ...args: Parameters<typeof fn>) {
			const fnCall = () => fn.apply(this, args)
			clearTimeout(timeout)
			timeout = setTimeout(fnCall, ms)
		}
	}

	const handleSearch = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length === 0) setUsersList([])
		if (value.length > 2) {
			setSearchInput(value)
			const users = await findUsersByNickname(value)

			if (!users.users) setUsersList([])
			else setUsersList(users.users)
		} else {
			setSearchInput('')
		}
	}, 300)
	const handleSendInvite = async (teamId: number, userId: number) => {
		const response = await invitesService('POST', { teamId, userId })
		if (response.message === 'ok') {
			setSentInvites((prev) => new Set(prev).add(userId))
		}
	}
	return (
		<div
			className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex justify-center items-start z-30 overflow-hidden"
			onClick={() => handleClose()}>
			<div className="relative w-auto max-w-md mx-auto shadow-lg mt-72"
					 onClick={(event) => {
						 event.stopPropagation()
					 }}>
				<div className="relative w-[280px] overflow-hidden rounded-[4px]">
					<input type="text" className="bg-bgTable p-1 w-full outline-none shadow-lg"
								 placeholder={dic('User.Team.FindUsers.searchInput')} onKeyUp={handleSearch} />
					<IoSearchSharp className="text-lg absolute top-2 right-1" />
					{usersList.length > 0 ? <div className="max-h-[300px] overflow-auto">
						{usersList.map(user => (
							<div key={user.id}
									 className="flex justify-between items-center p-1 bg-bgPrimary border-b border-b-gray-700 last:border-b-0">
								<div className="flex items-center gap-2">
									<TeamUserLogo url={user.avatar} alt={dic('Menu.User.avatar')} />
									<p className="text-sm">{user.nickname}</p>
								</div>
								{!sentInvites.has(user.id) && (
									<MdAddBox className="text-primary text-xl mr-5 cursor-pointer"
														onClick={() => handleSendInvite(userData?.teamId || 0, user.id)} />
								)}
							</div>
						))}
					</div> : searchInput ? <div className="p-1 bg-bgPrimary">{dic('User.Team.FindUsers.noUsers')}</div> : ''}
				</div>
			</div>
		</div>
	)
}

export default SendInvites

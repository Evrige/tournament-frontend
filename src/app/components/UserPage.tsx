'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { IUser } from '@/app/types/db.interface'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { calculateAge } from '@/app/utils/getAge'
import FillButton from '@/app/components/UI/FillButton'
import { MdPersonAddAlt1 } from 'react-icons/md'
import { useUser } from '@/app/components/Providers/UserProvider'
import Loader from '@/app/(routes)/loader'

const UserPage = ({ user }: { user: IUser }) => {
	const dic = useTranslations()
	const {user: currentUser, isLoading} = useUser()
	
	if (isLoading) return <Loader/>

	return (
		<div className="flex gap-5">
			<TeamUserLogo url={user.avatar || '/images/default-profile-logo.png'}
										size="w-36 h-36"
										alt={dic('Alt.userAvatar')} />
			<div className="w-4/5">
				<div className="flex justify-between items-center">
					<div>
						<p className="text-2xl text-accentText">{user.nickname}</p>
						{user.name && user.lastname && <p className="text-xl my-1">{`${user.name} ${user.lastname}`}</p>}
					</div>
					<div>
						{}
						<FillButton title={
							<span className="flex gap-2">
								{dic('UserPage.addToFriend')}
								<MdPersonAddAlt1 className="text-2xl"/>
							</span>} color="bg-primary"/>
					</div>
				</div>
				<div className="flex justify-between mt-1 pb-1 border-b border-b-gray-500">
					<span>{`${dic('UserPage.age')}: `}</span>
					{user.dateBirth ? <span>{calculateAge(user.dateBirth)}</span> : "-"}
				</div>
				<div className="flex gap-2 justify-between items-center mt-2 pb-2 border-b border-b-gray-500">
					<span>{`${dic('UserPage.team')}: `}</span>
					<span className="flex justify-center items-center gap-3">
						{user.teamId ?
							<>
								<TeamUserLogo url={user.team?.logo || '/images/default-team-logo.png'}
															size="w-8 h-8" alt={dic('Alt.teamLogo')} />
								{user.team?.name}
						</> : dic('UserPage.noTeam')}

					</span>
				</div>
			</div>
		</div>
	)
}

export default UserPage
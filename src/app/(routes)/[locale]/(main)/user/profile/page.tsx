'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import useUserData from '@/app/hooks/useUserData'
import { IoMdClose, IoMdPersonAdd } from 'react-icons/io'
import { menuUserItems } from '@/app/constants/menuItems'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import ProfileStats from '@/app/components/ProfileStats'
import BackgroundImage from '@/app/components/BackgroundImage'
import PageMenu from '@/app/components/PageMenu'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrimaryButton from '@/app/components/UI/PrimaryButton'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import instance from '@/app/api/api.interseptor'
import { defaultNotify } from '@/app/utils/notification/defaultNotify'
import CreateTeam from '@/app/components/modals/CreateTeam'
import { useQueryClient } from '@tanstack/react-query'
import useTeamUsers from '@/app/hooks/useTeamUsers'
import { EnumRole, IUser } from '@/app/types/db.interface'
import SendInvites from '@/app/components/modals/SendInvites'
import Loader from '@/app/(routes)/loader'
import { leaveTeam } from '@/app/service/leaveTeam'
import { useUser } from '@/app/components/Providers/UserProvider'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import { successNotify } from '@/app/utils/notification/successNotify'
import { getUser } from '@/app/service/getUser'


const Page = () => {
	const dic = useTranslations()

	const [modalState, setModalState] = useState<{ isOpen: boolean, type: string | null }>({ isOpen: false, type: null })
	const {user, updateUser} = useUser()
	const {data: teamUsers, isLoading: teamUsersLoading} = useTeamUsers()

	if (teamUsersLoading) return <Loader/>

	const handleLeave = async () => {
		const data = await leaveTeam()
		if (data.statusCode === 200){
			successNotify(data.message)
			updateUser(await getUser())
		}
		else errorNotify(data.message)
	}
	const openModal = (type: string) => {
		setModalState({ isOpen: true, type })
	}

	const closeModal = () => {
		setModalState({ isOpen: false, type: null })
	}
	const isTeamManager = user?.roles?.some(role => role.role.name === EnumRole.MANAGER)

	return (
		<div className="">
			<div className="flex flex-col bg-bgPrimary rounded-[8px] max-w-[300px] ml-5 mt-5">
				<div className="flex justify-between items-center rounded-t-[8px] bg-bgTable">
					<h1 className="text-accentText text-2xl uppercase p-3">
						{dic('User.Team.team')}</h1>
					{isTeamManager ? <IoMdPersonAdd className="text-xl text-primary mr-3 cursor-pointer"
																					onClick={() => openModal('invitePlayer')}/> : ""}
				</div>
				{user?.teamId ?
					<div>
						<div className="flex gap-3 items-center border-b py-3 pl-2 border-b-bgSecondary">
							<TeamUserLogo url={user.team?.logo || ''} alt={dic('User.Team.teamLogo')} />
							<p className="text-xl text-accentText">{user?.team?.name}</p>
						</div>
						<p className="text-xl text-accentText border-b py-3 pl-2 border-b-bgSecondary">{dic('User.Team.players')}</p>
						{teamUsers?.users?.map((player: IUser) => (
							<div key={player.id} className="flex justify-between items-center border-b border-b-bgSecondary">
								<div className="flex gap-3 items-center py-3 pl-2">
									<TeamUserLogo url={player.avatar || ''} alt={dic('User.Team.userLogo')} />
									<p className="text-xl text-accentText">{player?.nickname}</p>
								</div>
								{user.id !== player.id && isTeamManager ?
									<IoMdClose className="text-xl text-red-500 mr-3"/>
								: ""}
							</div>
						))}
						<div className="flex justify-center" onClick={() => handleLeave()}>
							<PrimaryButton title={dic('User.Team.leaveTeam')} color="bg-buttonColor" />
						</div>
					</div>
					: <div>
						<div className="flex gap-3 items-center border-b py-3 pl-2 border-b-bgSecondary">
							<p>{dic('User.Team.teamNo')}</p>
						</div>
						<div className="flex justify-center" onClick={() => openModal('createTeam')}>
							<PrimaryButton title={dic('User.Team.createTeam')} color="bg-primary" />
						</div>
					</div>}
			</div>
			{modalState.isOpen && modalState.type === 'createTeam' && <CreateTeam handleClose={closeModal} />}
			{modalState.isOpen && modalState.type === 'invitePlayer' && <SendInvites handleClose={closeModal} />}
		</div>
	)
}

export default Page
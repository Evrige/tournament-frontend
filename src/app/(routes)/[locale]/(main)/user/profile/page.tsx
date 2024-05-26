'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import useUser from '@/app/hooks/useUser'
import { IoIosArrowDown, IoMdClose, IoMdPersonAdd } from 'react-icons/io'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import { menuUserItems } from '@/app/constants/menuItems'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import ProfileStats from '@/app/components/ProfileStats'
import BackgroundImage from '@/app/components/BackgroundImage'
import PageMenu from '@/app/components/PageMenu'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrimaryButton from '@/app/components/UI/PrimaryButton'
import TeamLogo from '@/app/components/UI/TeamUserLogo'
import instance from '@/app/api/api.interseptor'
import { defaultNotify } from '@/app/utils/notification/defaultNotify'
import CreateTeam from '@/app/components/modals/CreateTeam'
import { useQueryClient } from '@tanstack/react-query'
import useTeamUsers from '@/app/hooks/useTeamUsers'
import { EnumRole, IUser } from '@/app/types/db.interface'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { IoPersonAddSharp } from 'react-icons/io5'
import SendInvites from '@/app/components/modals/SendInvites'

const leaveTeam = async (): Promise<{message: string}> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_LEAVE_FROM_TEAM_URL,
		method: 'PUT',
	});
	return response.data;
};

const Page = () => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const [modalState, setModalState] = useState<{ isOpen: boolean, type: string | null }>({ isOpen: false, type: null })
	const { data: user, isLoading: userLoading } = useUser()
	const queryClient  = useQueryClient()
	const {data: teamUsers, isLoading: teamUsersLoading} = useTeamUsers()

	if (userLoading || teamUsersLoading) return <div>Loading...</div>

	const handleLeave = async () => {
		const data = await leaveTeam()
		queryClient.invalidateQueries({queryKey: ['user']});
		defaultNotify(data.message)
	}
	const openModal = (type: string) => {
		setModalState({ isOpen: true, type })
	}

	const closeModal = () => {
		setModalState({ isOpen: false, type: null })
	}
	const isTeamManager = user?.roles?.some(role => role.role.name === EnumRole.MANAGER)

	return (
		<div className="bg-bgSecondary min-h-[calc(100vh-85px)]">
			<div className="relative">
				<BackgroundImage src="/images/profile-back.jpg" alt={dic('User.Profile.BackgroundAlt')}/>
				<Breadcrumbs/>
				<div className="absolute w-full bottom-0 pl-4 z-20">
					<div className="flex items-center gap-2">
						<Image src={getImageUrl(user?.avatar || '')} alt={dic('User.Profile.avatar')} width={100} height={100} />
						<p className="text-3xl text-accentText">{user?.nickname}</p>
					</div>
					<PageMenu menuList={menuUserItems}/>
					<div className="flex justify-between">
						<div className="flex flex-col gap-2 ml-3">
							<h1 className="text-accentText text-2xl uppercase">{dic('User.Main.main')}</h1>
							<div className="flex gap-10 flex-wrap	">
								<ProfileStats name={'0'}
															subName={dic('User.Main.matches')}
															icon={<RiGameLine />} />
								<ProfileStats name={'0'}
															subName={dic('User.Main.tournamentsCount')}
															icon={<SlTrophy />} />
								<ProfileStats name={'0'}
															subName={dic('User.Main.winRate')}
															icon={<FaChampagneGlasses />} />
							</div>
						</div>
						<div className="pr-10">
							<h1 className="text-accentText text-2xl uppercase mb-3">{dic('User.Main.achievements')}</h1>
							<p>{dic('User.Main.achievementsNo')}</p>
						</div>
					</div>
				</div>
			</div>
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
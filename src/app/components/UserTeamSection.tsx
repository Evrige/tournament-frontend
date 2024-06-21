import React, { useState } from 'react'
import { IoMdClose, IoMdPersonAdd } from 'react-icons/io'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { EnumRole, IUser } from '@/app/types/db.interface'
import FillButton from '@/app/components/UI/FillButton'
import { useTranslations } from 'next-intl'
import { useUser } from '@/app/components/Providers/UserProvider'
import useTeamUsers from '@/app/hooks/useTeamUsers'
import Loader from '@/app/(routes)/loader'
import { leaveTeam } from '@/app/service/leaveTeam'
import { successNotify } from '@/app/utils/notification/successNotify'
import { getUser } from '@/app/service/getUser'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import CreateTeam from '@/app/components/modals/CreateTeam'
import SendInvites from '@/app/components/modals/SendInvites'
import ConfirmModal from '@/app/components/modals/ConfirmModal'

enum EnumModalTitle {
	CREATE_TEAM = 'CREATE_TEAM',
  SEND_INVITES = 'SEND_INVITES',
  CONFIRM_LEAVE = 'CONFIRM_LEAVE'
}
const UserTeamSection = () => {
	const dic = useTranslations()
	const {user, updateUser} = useUser()
	const isTeamManager = user?.roles?.some(role => role.role.name === EnumRole.MANAGER)

	const [modalState, setModalState] = useState<{ isOpen: boolean, type: EnumModalTitle | null }>({ isOpen: false, type: null })

	const {data: teamUsers, isLoading: teamUsersLoading} = useTeamUsers()
	if (teamUsersLoading) return <Loader/>

	const openModal = (type: EnumModalTitle) => {
		setModalState({ isOpen: true, type })
	}

	const closeModal = () => {
		setModalState({ isOpen: false, type: null })
	}

	const confirmLeave = () => {
		return new Promise((resolve) => {
			const handleAnswer = (answer) => {
				resolve(answer)
				closeModal()
			}

			setModalState({ isOpen: true, type: EnumModalTitle.CONFIRM_LEAVE, handleAnswer })
		})
	}

	const handleLeave = async () => {
		if (isTeamManager) {
			const answer = await confirmLeave()
			if (!answer) return
		}

		const result = await leaveTeam()
		if (result.status === 200){
			successNotify(result.message)
			updateUser(await getUser())
		}
		else errorNotify(result.message)
	}

	return (
		<div className="flex flex-col bg-bgPrimary rounded-[8px] max-w-[300px] ml-5 mt-5">
			<div className="flex justify-between items-center rounded-t-[8px] bg-bgTable">
				<h1 className="text-accentText text-2xl uppercase p-3">
					{dic('User.Team.team')}</h1>
				{isTeamManager ? <IoMdPersonAdd className="text-xl text-primary mr-3 cursor-pointer"
																				onClick={() => openModal(EnumModalTitle.SEND_INVITES)} /> : ""}
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
							{user.id !== player.id && isTeamManager &&
								<IoMdClose className="text-xl text-red-500 mr-3" />}
						</div>
					))}
					<div className="flex justify-center my-3" onClick={handleLeave}>
						<FillButton title={dic('User.Team.leaveTeam')} color="bg-buttonColor" />
					</div>
				</div>
				: <div>
					<div className="flex gap-3 items-center border-b py-3 pl-2 border-b-bgSecondary">
						<p>{dic('User.Team.teamNo')}</p>
					</div>
					<div className="flex justify-center my-3" onClick={() => openModal(EnumModalTitle.CREATE_TEAM)}>
						<FillButton title={dic('User.Team.createTeam')} color="bg-primary" />
					</div>
				</div>}
			{modalState.isOpen && modalState.type === EnumModalTitle.CREATE_TEAM && <CreateTeam handleClose={closeModal} />}
			{modalState.isOpen && modalState.type === EnumModalTitle.SEND_INVITES && <SendInvites handleClose={closeModal} />}
			{modalState.isOpen && modalState.type === EnumModalTitle.CONFIRM_LEAVE &&
				<ConfirmModal handleClose={closeModal}
											text={dic("ConfirmModal.confirmDeleteTeam")}
											handleAnswer={modalState.handleAnswer}/>}
		</div>
	)
}

export default UserTeamSection
import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import useUser from '@/app/hooks/useUser'
import { EnumRole } from '@/app/types/db.interface'
import { IBracket } from '@/app/types/bracket.intreface'

interface IProps {
	handleClose: () => void,
	matchData: IBracket
}

const MatchModal = ({ matchData, handleClose }: IProps) => {
	const dic = useTranslations()
	const { data: user } = useUser()
	const isAdmin = user?.roles.some(role => role.role.name === EnumRole.ADMIN)
	console.log(matchData)
	matchData.participants[0].resultText = '3'
	return (
		<div
			className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
			onClick={() => handleClose()}>
			<div className="relative flex flex-col items-center w-1/2 h-1/2 bg-bgPrimary rounded-[8px]"
					 onClick={(event) => {
						 event.stopPropagation()
					 }}>
				<div className="flex gap-1 text-xl p-5">
					{matchData.participants.map((team, index) => {
						const otherTeam = matchData.participants[1 - index]
						const isWin = team.resultText > otherTeam.resultText ? true
							: team.resultText < otherTeam.resultText ? false : 'draw'
						return (
							<div key={team.id}>
								<div className={`flex items-center gap-1 last:flex-row-reverse p-2 first:border-l-2 last:border-r-2
							${isWin === 'draw' ? '' : isWin ? 'border-green-500' : 'border-red-500 opacity-70'}`}>
									<p>{team.name}</p>
									<TeamUserLogo url={team.logo || ''} alt={dic('Tournament.Bracket.MatchModal.teamLogo')} />
									<input type="text" className={`text-center rounded-[4px] px-1 py-0 w-5 
							${isAdmin ? 'bg-bgSecondary' : 'bg-transparent'} 
							${isWin === 'draw' ? '' : isWin ? 'text-green-500' : 'text-red-500'}`}
												 value={team.resultText} readOnly={isAdmin} />
								</div>
								<h1>{dic('Tournament.Bracket.MatchModal.players')}</h1>
								<div className="">
									{team.user.map(user => (
										<div key={user.id} className={`flex gap-2 items-center`}>
											<TeamUserLogo url={user.avatar || ''} alt={dic('Tournament.Bracket.MatchModal.userAvatar')} />
											<p>{user.nickname}</p>
										</div>
									))}
								</div>
							</div>

						)
					})}


				</div>
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer" onClick={() => handleClose()} />
			</div>
		</div>
	)
}

export default MatchModal

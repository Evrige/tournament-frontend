import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import useUser from '@/app/hooks/useUser'
import { EnumRole, IMatch } from '@/app/types/db.interface'
import { IBracket } from '@/app/types/bracket.intreface'
import Button from '@/app/components/UI/Button'
import { updateMatch } from '@/app/service/updateMatch'
import { closeTournament } from '@/app/service/closeTournament'

interface IProps {
	handleClose: () => void,
	matchData: IBracket
}

const MatchModal = ({ matchData, handleClose }: IProps) => {
	const dic = useTranslations()
	const { data: user } = useUser()
	const isAdmin = user?.roles.some(role => role.role.name === EnumRole.ADMIN)

	const [newMatchData, setNewUpdateMatch] = useState({
		id: matchData.id,
		team1RoundsWon: parseInt(matchData.participants[0].resultText),
		team2RoundsWon: parseInt(matchData.participants[1].resultText),
		teamWinId: null
	})
	console.log(newMatchData)
	const handleInputChange = (index: number, value: string) => {
		setNewUpdateMatch(prevState => ({
			...prevState,
			[`team${index + 1}RoundsWon`]: +value
		}))
	}
	const handleWinTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const winTeamId = e.target.value;
		// @ts-ignore
		setNewUpdateMatch(prevState => ({
			...prevState,
			teamWinId: +winTeamId
		}));
	}

	const handleSendData = async() => {
		await updateMatch(newMatchData)
		if (!matchData.nextMatchId && newMatchData.teamWinId){
			await closeTournament(matchData.tournamentId)
		}
	}
	
	return (
		<div
			className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
			onClick={() => handleClose()}>
			<div className="relative flex flex-col items-center w-2/5 bg-bgPrimary rounded-[8px]"
					 onClick={(event) => {
						 event.stopPropagation()
					 }}>
				<div className="flex items-center justify-between w-full gap-5 text-xl mt-10 mb-4">
					{matchData?.participants?.map((team, index) => {
						// @ts-ignore
						const isWin = +newMatchData[`team${index + 1}RoundsWon`] > +newMatchData[`team${1 - index + 1}RoundsWon`] ? true
							// @ts-ignore
							: +newMatchData[`team${index + 1}RoundsWon`] < +newMatchData[`team${1 - index + 1}RoundsWon`] ? false : 'draw'

						return (
							<div className="w-1/2" key={team.id}>
								<div className={`flex items-center justify-end gap-1 p-2 
                                    ${index === 1 ? "flex-row-reverse border-r-2" : "border-l-2 "}
                                    ${isWin === 'draw' ? '' : isWin ? 'border-green-500' : 'border-red-500 opacity-70'}`}>
									<p title={team.name || ""} className="line-clamp-1 max-w-[150px]">{team.name}</p>
									<TeamUserLogo url={team.logo || ''} alt={dic('Tournament.Bracket.MatchModal.teamLogo')} />
									<input
										type="text"
										// @ts-ignore
										value={newMatchData[`team${index + 1}RoundsWon`]}
										onChange={(e) => handleInputChange(index, e.target.value)}
										readOnly={!isAdmin}
										className={`text-center rounded-[4px] px-1 py-0 w-10 outline-none
                                        ${isAdmin ? 'bg-bgSecondary' : 'bg-transparent'}
                                        ${isWin === 'draw' ? '' : isWin ? 'text-green-500' : 'text-red-500'}`}
									/>
								</div>
								<div className="mt-10 mx-3">
									<h1 className={`mb-3 ${index === 1 ? "text-right" : ""}`}>{dic('Tournament.Bracket.MatchModal.players')}</h1>
									{team?.user?.map(user => (
										<div key={user.id} className={`flex gap-4 mb-1 items-center ${index === 1 ? 'flex-row-reverse' : ''}`}>
											<TeamUserLogo url={user.avatar || ''} alt={dic('Tournament.Bracket.MatchModal.userAvatar')} />
											<p>{user.nickname}</p>
										</div>
									))}
								</div>
							</div>
						)
					})}
				</div>
				{isAdmin ? <div className="flex items-center justify-end gap-3 py-5">
					<label>
						<p>{dic('Tournament.Bracket.MatchModal.winTeam')}</p>
						<select
							name="winTeam"
							id="winTeam"
							className="w-[200px] h-8 mb-4 rounded-[4px] bg-bgSecondary outline-none"
							value={newMatchData.teamWinId || ""}
							onChange={handleWinTeamChange}>
							<option value="">{dic('Tournament.Bracket.MatchModal.selectWinner')}</option>
							<option value={matchData.participants[0].id || 0}>{matchData.participants[0].name}</option>
							<option value={matchData.participants[1].id || 0}>{matchData.participants[1].name}</option>
						</select>
					</label>
					<div onClick={()=> handleSendData()}>
						<Button title={dic('Tournament.Bracket.MatchModal.updateMatch')} borderColor="border-primary" />
					</div>
				</div> : ''}
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer" onClick={() => handleClose()} />
			</div>
		</div>
	)
}

export default MatchModal

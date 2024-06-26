import { EnumInviteStatus, ITeam, IUser } from '@/app/types/db.interface'

export interface IAllInvites {
		id: number
		userId: number
		teamId: number
		status: EnumInviteStatus
		team: ITeam
		createdAt: Date
		updatedAt: Date
		user1Id: number
		user2Id: number
		user1: IUser
		type: string
}
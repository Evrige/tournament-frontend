import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const startTournament = async (id: number) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_START_TOURNAMENT_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};
import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const closeTournament = async (id: number) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_CLOSE_TOURNAMENT_URL}/${id}`,
		method: 'PUT',
	});
	return response.data;
};
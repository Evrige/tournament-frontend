import { IMatch, IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const updateUser = async (data: any) => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_UPDATE_MATCH_URL,
		method: 'PUT',
		data
	});
	return response.data;
};
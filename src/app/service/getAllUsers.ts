import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const getAllUserId = async (): Promise<IUser[]> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_USERS_BY_ID_URL,
		method: 'GET',
	});
	return response.data;
};
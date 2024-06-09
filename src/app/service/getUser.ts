import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const getUser = async (): Promise<IUser> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_USER_USER_DATA_URL,
		method: 'GET',
	});
	return response.data;
};
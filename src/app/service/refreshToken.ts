import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const refreshToken = async (): Promise<{ user: IUser; message: string }> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_AUTH_REFRESH_URL,
		method: 'GET',
	});
	return response.data;
};
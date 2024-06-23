import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const getUserById = async (id: string): Promise<IUser> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_USER_BY_ID_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};
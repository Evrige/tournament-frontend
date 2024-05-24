import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const findUsersByNickname = async (nickname: string) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_FIND_USERS_BY_NICKNAME_URL}/${nickname}`,
		method: 'GET',
	});
	return response.data;
};
import { IRating, ITournament, IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const getResult = async () => {
	const response = await instance<ITournament[]>({
		url: process.env.NEXT_PUBLIC_GET_RESULT_URL,
		method: 'GET',
	});
	return response.data;
};
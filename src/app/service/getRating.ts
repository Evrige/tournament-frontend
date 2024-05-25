import { IRating, IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

export const getRating = async (params?: string) => {
	const response = await instance<IRating[]>({
		url: `${process.env.NEXT_PUBLIC_GET_RATING_URL}/${params ? params : ""}`,
		method: 'GET',
	});
	return response.data;
};
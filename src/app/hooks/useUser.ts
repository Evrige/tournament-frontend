import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

// @ts-ignore
const fetchUser = async (): Promise<IUser, Error> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_USER_USER_DATA_URL,
		method: 'GET',
	});
	return response.data?.user;
};

const useUser = () => {
	return useQuery<IUser, Error>({
		queryKey: ['user'],
		queryFn: fetchUser,
		gcTime: 1000000,
		staleTime: 1000000
	}
	);
};

export default useUser;

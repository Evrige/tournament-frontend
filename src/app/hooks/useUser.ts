import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'
import useSSE from '@/app/hooks/useSSE'

const fetchUser = async (): Promise<IUser> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_USER_USER_DATA_URL,
		method: 'GET',
	});
	return response.data;
};

const useUser = () => {
	const query = useQuery<IUser>({
		queryKey: ['user'],
		queryFn: fetchUser,
		// staleTime: 1000000,
		// gcTime: 1000000
	});

	// console.log('User data from useUser:', query.data);
	return query;
};

export default useUser;

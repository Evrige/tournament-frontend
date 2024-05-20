import { useQuery, QueryFunctionContext, useQueryClient } from '@tanstack/react-query'
import { IGame, IUser } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'
import useSSE from '@/app/hooks/useSSE'

const fetchUser = async (): Promise<IUser> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_AUTH_REFRESH_URL,
		method: 'GET',
	});
	return response.data;
};

const useRefresh = () => {
	const queryClient = useQueryClient()
	const data = useQuery<IUser, Error>({queryKey: ['refresh'], queryFn: fetchUser});
	queryClient.setQueryData(['user'], data.user);
};

export default useRefresh;

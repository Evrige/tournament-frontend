import { useQuery, useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/app/types/db.interface';
import instance from '@/app/api/api.interseptor';

const fetchUser = async (): Promise<{ user: IUser; message: string }> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_AUTH_REFRESH_URL,
		method: 'GET',
	});
	return response.data;
};

const useRefresh = () => {
	const queryClient = useQueryClient();
	const { data, error } = useQuery<{ user: IUser; message: string }, Error>({
		queryKey: ['refresh'],
		queryFn: fetchUser,
	});

	if (data) {
		queryClient.setQueryData(['user'], data.user);
	}

	if (error) {
		console.error('Error fetching user:', error);
	}

	return { data, error };
};

export default useRefresh;

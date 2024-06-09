import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/app/types/db.interface'
import { refreshToken } from '@/app/service/refreshToken'


const useRefresh = () => {
	const { data, error } = useQuery<{ user: IUser; message: string }, Error>({
		queryKey: ['refresh'],
		queryFn: refreshToken,
	});

	if (error) {
		console.error('Error fetching user:', error);
	}

	return { data, error };
};

export default useRefresh;

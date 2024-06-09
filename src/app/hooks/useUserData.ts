import { useQuery } from '@tanstack/react-query'
import { IUser } from '@/app/types/db.interface'
import { getUser } from '@/app/service/getUser'

const useUserData = () => {
	const query = useQuery<IUser>({
		queryKey: ['user'],
		queryFn: getUser,
	});

	return query;
};

export default useUserData;

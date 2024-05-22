import { useQuery } from '@tanstack/react-query'
import instance from '@/app/api/api.interseptor'

const fetchUser = async () => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_GET_TEAM_USERS_URL,
		method: 'GET',
	});
	return response.data;
};

const useTeamUser = () => {
	return useQuery({
		queryKey: ['teamUser'],
		queryFn: fetchUser,
	});
};

export default useTeamUser;

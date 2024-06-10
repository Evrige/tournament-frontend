import { useQuery } from '@tanstack/react-query'
import instance from '@/app/api/api.interseptor'
import { getTeamUsers } from '@/app/service/getTeamUsers'

const useTeamUser = () => {
	return useQuery({
		queryKey: ['teamUsers'],
		queryFn: getTeamUsers,
	});
};

export default useTeamUser;

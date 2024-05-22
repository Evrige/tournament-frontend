import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { IGame } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

const leaveTeam = async (): Promise<{message: string}> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_LEAVE_FROM_TEAM_URL,
		method: 'PUT',
	});
	return response.data;
};

const useLeaveTeam = () => {
	return useQuery<{message: string}, Error>({queryKey: ['leaveTeam'], queryFn: leaveTeam});
};

export default useLeaveTeam;

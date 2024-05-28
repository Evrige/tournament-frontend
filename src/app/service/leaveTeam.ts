import instance from '@/app/api/api.interseptor'

export const leaveTeam = async (): Promise<{message: string}> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_LEAVE_FROM_TEAM_URL,
		method: 'PUT',
	});
	return response.data;
};
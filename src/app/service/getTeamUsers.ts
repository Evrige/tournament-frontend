import instance from '@/app/api/api.interseptor'

export const getTeamUsers = async () => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_GET_TEAM_USERS_URL,
		method: 'GET',
	});
	return response.data;
};
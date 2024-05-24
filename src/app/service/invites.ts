import instance from '@/app/api/api.interseptor'

export const invitesService = async (method: string, data?: any ) => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_SEND_INVITE_URL,
		method,
		data
	});
	return response.data;
};
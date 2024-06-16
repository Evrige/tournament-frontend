import instance from '@/app/api/api.interseptor'

export const changePassword = async (data: any) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_CHANGE_PASSWORD_URL}`,
		method: 'PUT',
		data
	});
	return response.data;
};
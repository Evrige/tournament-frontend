import instance from '@/app/api/api.interseptor'

export const updateUserData = async (data: any) => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_USER_UPDATE_URL,
		method: 'PUT',
		data,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return response.data;
};
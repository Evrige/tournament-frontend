import instance from '@/app/api/api.interseptor'

export const activateEmail = async (token: string) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_CONFIRM_USER_EMAIL_URL}/${token}`,
		method: 'PUT',
	});
	return response.data;
};
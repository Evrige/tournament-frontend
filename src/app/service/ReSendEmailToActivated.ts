import instance from '@/app/api/api.interseptor'

export const reSendEmailToActivated = async (data: any) => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_AUTH_RESEND_EMAIL_URL}`,
		method: 'PUT',
		data
	});
	return response.data;
};
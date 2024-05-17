import { getContentType } from '@/app/api/api.helper'
import axios from 'axios'

export const refreshToken = async() => {

	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_AUTH_REFRESH_URL}`,
		{
			headers: {
				...getContentType(),
			},
			withCredentials: true,
		}
	);

	return response.data;
}

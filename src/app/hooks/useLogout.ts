import { useMutation, useQueryClient } from '@tanstack/react-query'
import { successNotify } from '@/app/utils/notification/successNotify'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import instance from '@/app/api/api.interseptor'

const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			const res = await instance({
				url: process.env.NEXT_PUBLIC_AUTH_LOGOUT_URL,
				method: 'GET',
			})
			return res.data
		},
		onSuccess: (data) => {
			successNotify(data.message)
			queryClient.setQueryData(['user'], {});
		},
		onError: (error: {response: {data: {message: string}}}, variables, context) => {
			errorNotify(error.response.data.message)
		}
	})
}

export default useLogout
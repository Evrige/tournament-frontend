import { useMutation, useQueryClient } from '@tanstack/react-query'
import { successNotify } from '@/app/utils/notification/successNotify'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import instance from '@/app/api/api.interseptor'

const useRegistration = () => {
	return useMutation({
		mutationFn: async (data) => {
			const res = await instance({
				url: process.env.NEXT_PUBLIC_AUTH_REGISTRATION_URL,
				method: 'POST',
				data
			})
			return res.data
		},
		onSuccess: (data) => {
			successNotify(data.message)
		},
		onError: (error: {response: {data: {message: string}}}, variables, context) => {
			errorNotify(error.response.data.message)
		}
	})
}

export default useRegistration
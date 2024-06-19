import { useMutation } from '@tanstack/react-query'
import instance from '@/app/api/api.interseptor'

const useLogin = () => {
	return useMutation({
		mutationFn: async (data) => {
			const res = await instance({
				url: process.env.NEXT_PUBLIC_AUTH_LOGIN_URL,
				method: 'POST',
        data
			})
			return res.data
		}
	})
}

export default useLogin
'use client'
import { useLocale, useTranslations } from 'next-intl'
import Tournaments from '@/app/components/Tournaments'
import instance from '@/app/api/api.interseptor'
import { FcGoogle } from 'react-icons/fc'

export default function Home() {
	const dic = useTranslations()
	const localeActive = useLocale()


	// const { theme, setTheme } = useTheme()
	// const queryClient = useQueryClient();
	const handleGoogle = async () => {
		window.location.href = "http://localhost:5000/api/auth/google"
	}
	return (
		<div className="pb-5">

			<Tournaments />
		</div>
	)
}

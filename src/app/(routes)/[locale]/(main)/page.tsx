'use client'
import { useLocale, useTranslations } from 'next-intl'
import Tournaments from '@/app/components/Tournaments'

export default function Home() {
	const dic = useTranslations()
	const localeActive = useLocale()


	// const { theme, setTheme } = useTheme()
	// const queryClient = useQueryClient();

	return (
		<div className="pb-5">
			<Tournaments />
		</div>
	)
}

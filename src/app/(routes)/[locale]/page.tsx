'use client'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'

export default function Home() {
	const dic = useTranslations()
	const {theme, setTheme} = useTheme()
	return (
		<main className="">

		  {/*<button onClick={() => setTheme('light')}>Light Mode</button>*/}
		  {/*<button onClick={() => setTheme('dark')}>Dark Mode</button>*/}
		</main>
	);
}

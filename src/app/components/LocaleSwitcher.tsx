'use client'
import React, {ChangeEvent, startTransition} from 'react'
import {useLocale} from 'next-intl'
import {usePathname, useRouter} from 'next/navigation'

const LocaleSwitcher = () => {
	const router = useRouter()
	const localeActive = useLocale()
	const pathname = usePathname()
	const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = e.target.value
		startTransition(() => {
			router.push(pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`))
		})

	}
	console.log(localeActive) // ru or en or ua
	return (
		<select className="bg-transparent py-2"
						value={localeActive}
						onChange={onSelectChange}>
			<option value="en">English</option>
			<option value="ru">Russian</option>
			<option value="ua">Ukraine</option>
		</select>
	)
}

export default LocaleSwitcher
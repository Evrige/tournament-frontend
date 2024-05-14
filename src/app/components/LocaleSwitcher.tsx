'use client'
import React, { ChangeEvent, startTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const LocaleSwitcher = () => {
	const router = useRouter()
	const localActive = useLocale()
	const pathname = usePathname()
	const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const nextLocale = e.target.value
		startTransition(() => {
			router.push(pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`))
		})

	}
	return (
		<label className="border-2 rounded">
			<select className="bg-transparent py-2"
							defaultValue={localActive}
							onChange={onSelectChange}>
				<option value="en">English</option>
				<option value="ru">Russian</option>
				<option value="ua">Ukraine</option>
			</select>
		</label>
	)
}

export default LocaleSwitcher
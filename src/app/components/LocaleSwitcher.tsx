'use client'
import React, { startTransition, useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { localeLang } from '@/app/constants/headerItems'
import { IoIosArrowDown } from 'react-icons/io'
import { FaGlobe } from 'react-icons/fa'

const LocaleSwitcher = () => {
	const router = useRouter()
	const localeActive = useLocale()
	const pathname = usePathname()
	const dic = useTranslations()
	const [dropDownIsActive, setDropDownIsActive] = useState(false)
	const dropDownRef = useRef<HTMLDivElement >(null)

	const onChangeLocale = (value: string) => {
		const nextLocale = value
		startTransition(() => {
			router.push(pathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`))
		})
		setDropDownIsActive(false)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropDownRef?.current?.contains(event.target as Node))
				setDropDownIsActive(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropDownRef])

	return (
		<div className="relative" ref={dropDownRef}>
			<div className="flex items-center hover:text-accentText cursor-pointer" onClick={(event) => {
				event.stopPropagation()
				setDropDownIsActive(!dropDownIsActive)
			}}>
				<FaGlobe size="20px" className="mr-1.5" />
				<span className="align-middle capitalize">{localeActive}</span>
				<IoIosArrowDown size="20px"
												className={`ml-0.5 mt-0.5 transform transition-transform duration-300 
											 ${dropDownIsActive ? 'max-md:rotate-90 rotate-180' : 'max-md:-rotate-90 rotate-0'}`} />
			</div>
			<ul className={`${dropDownIsActive ? 'absolute' : 'hidden'} top-16 right-4 bg-bgPrimary rounded-[8px] p-5`}>
				{localeLang.map(locale =>
					<li key={locale.value} className="mb-3 mr-12 cursor-pointer hover:text-accentText" onClick={() => onChangeLocale(locale.value)}>
						{dic(locale.label)}
					</li>
				)}
			</ul>
		</div>
	)
}

export default LocaleSwitcher
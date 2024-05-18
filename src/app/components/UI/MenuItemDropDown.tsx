import React, { startTransition, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'

interface IProps{
	title: string
	list: any
}
const MenuItemDropDown = ({title, list}:IProps) => {
	const localeActive = useLocale()
	const [dropDownIsActive, setDropDownIsActive] = useState(false)
	const dropDownRef = useRef<HTMLDivElement>(null)
	const dic = useTranslations()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropDownRef?.current?.contains(event.target as Node))
				setDropDownIsActive(false)
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropDownRef])

	return (
		<div key={title} className="cursor-pointer relative" ref={dropDownRef}>
			<div className="flex items-center justify-center hover:text-accentText"
				onClick={(event) => {
				event.stopPropagation()
				setDropDownIsActive(!dropDownIsActive)
			}}>
				<p>{title}</p>
				<IoIosArrowDown size="20px"
												className={`ml-0.5 mt-0.5 transform transition-transform duration-300 
											 ${dropDownIsActive ? 'max-md:rotate-90 rotate-180' : 'max-md:-rotate-90 rotate-0'}`} />
			</div>
			<ul className={`${dropDownIsActive ? 'absolute' : 'hidden'} top-16 right-4 bg-bgPrimary rounded-[8px] p-5 w-[200px]`}>
				{list?.map((item: { name: string; link: string }) => (
          <li key={item.name} className="mb-3 mr-12 cursor-pointer hover:text-accentText" >
            <Link href={`/${localeActive}/${item.link}`}>{dic(item.name)}</Link>
          </li>
        ))}
			</ul>
		</div>
	);
};

export default MenuItemDropDown;
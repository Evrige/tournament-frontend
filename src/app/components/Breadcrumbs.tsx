import React from 'react'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import { IoIosArrowDown } from 'react-icons/io'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

const Breadcrumbs = ({name} : {name ?: string}) => {
	const localeActive = useLocale()
	const path = usePathname()
	const currentPath = path.split('/').splice(2)
	return (
		<nav className="absolute flex w-full top-0 z-25 p-3 bg-bgSecondary bg-opacity-70">
			<ol className="flex">
				{currentPath.map((pathName, index) => {
					const href = `/${currentPath.slice(0, index + 1).join('/')}`;
					const isLast = index === currentPath.length - 1
					const newPathName = isNaN(Number(pathName)) ? pathName : name
					return (
						<li key={pathName} className="flex items-center z-10">
							<Link href={getUrl(href, localeActive)}
										className={`uppercase text-lg ${isLast ? 'text-accentText' : ''}`}>{newPathName}</Link>
							{!isLast ? <IoIosArrowDown className="text-primary text-xl mx-1 -rotate-90" /> : ''}
						</li>
					);
				})}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
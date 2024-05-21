import React from 'react'
import { getUrl } from '@/app/utils/getUrl'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { updateLastPathSegment } from '@/app/utils/updateLastPathSegment'

interface IMenuItem {
	name: string;
	link: string;
}

interface IProps {
	menuList: IMenuItem[];
}

const PageMenu = ({ menuList }: IProps ) => {
	const localeActive = useLocale()
	const dic = useTranslations()
	const path = usePathname()

	return (
		<div className="flex gap-2 uppercase ml-3 my-10">
			{menuList.map(menuItem => {
				const isActive = getUrl(menuItem.link, localeActive) === path

				return (
					<Link href={getUrl(menuItem.link, localeActive)}
								className={`pb-2 px-2 hover:text-accentText ${isActive ? 'border-b border-primary text-primary' : ''}`}
								key={menuItem.link}>
						{dic(menuItem.name)}
					</Link>
				)
			})}
		</div>
	)
}

export default PageMenu
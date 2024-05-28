import React from 'react';
import Link from "next/link";
import { getUrl } from '@/app/utils/getUrl'
import { useLocale, useTranslations } from 'next-intl'

interface IProps{
	title: string
	link: string
}
const MenuItemLink = ({title, link}:IProps) => {
	const localeActive = useLocale()
	const dic = useTranslations()

	return (
		<p key={title} className="hover:text-accentText">
			<Link href={getUrl(link, localeActive)}>{dic(title)}</Link>
		</p>
	);
};

export default MenuItemLink;
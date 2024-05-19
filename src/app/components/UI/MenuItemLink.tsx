import React from 'react';
import Link from "next/link";
import { getUrl } from '@/app/utils/getUrl'
import { useLocale } from 'next-intl'

interface IProps{
	title: string
	link: string
}
const MenuItemLink = ({title, link}:IProps) => {
	const localeActive = useLocale()
	return (
		<p key={title} className="hover:text-accentText">
			<Link href={getUrl(link, localeActive)}>{title}</Link>
		</p>
	);
};

export default MenuItemLink;
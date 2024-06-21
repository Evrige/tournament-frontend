import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface IProps{
	title: string
	link: string
}
const MenuItemLink = ({title, link}:IProps) => {
	const dic = useTranslations()

	return (
		<p key={title} className="hover:text-accentText">
			<Link href={link}>{dic(title)}</Link>
		</p>
	);
};

export default MenuItemLink;
import React from 'react';
import Link from "next/link";

interface IProps{
	title: string
	link: string
}
const MenuItemLink = ({title, link}:IProps) => {
	return (
		<p key={title} className="hover:text-accentText">
			<Link href={link}>{title}</Link>
		</p>
	);
};

export default MenuItemLink;
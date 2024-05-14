import React from 'react';
import Link from "next/link";

interface IProps{
	title: string
	link: string
}
const MenuItemLink = ({title, link}:IProps) => {
	return (
		<li key={title} className="hover:text-accentText">
			<Link href={link}>{title}</Link>
		</li>
	);
};

export default MenuItemLink;
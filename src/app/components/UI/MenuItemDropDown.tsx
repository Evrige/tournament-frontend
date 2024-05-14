import React from 'react';

interface IProps{
	title: string
}
const MenuItemDropDown = ({title}:IProps) => {
	return (
		<li key={title} className="cursor-pointer hover:text-accentText">
			{title}
		</li>
	);
};

export default MenuItemDropDown;
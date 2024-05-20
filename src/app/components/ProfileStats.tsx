import React from 'react'
import { RiGameLine } from 'react-icons/ri'

interface IProps {
	name: string,
	subName: string,
	icon: React.Component
}
const ProfileStats = ({name, subName, icon}:IProps) => {
	return (
		<div className="flex gap-3 items-center max-w-[200px]">
			<span className="text-5xl">
				{icon}
			</span>
			<div>
				<p className="text-accentText">{name}</p>
				<p className="line-clamp-1">{subName}</p>
			</div>
		</div>
	)
}

export default ProfileStats
import React from 'react'

const FillButton = ({title, color}: {title: string, color: string}) => {
	return (
		<button className={`py-2 px-3 ${color} text-bgSecondary min-w-[70px] rounded-[4px]`}>{title}</button>
	)
}

export default FillButton
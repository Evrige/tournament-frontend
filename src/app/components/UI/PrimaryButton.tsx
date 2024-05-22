import React from 'react'

const PrimaryButton = ({title, color}: {title: string, color: string}) => {
	return (
		<button className={`py-2 px-3 ${color} text-bgSecondary rounded-[4px] my-3 mx-6`}>{title}</button>
	)
}

export default PrimaryButton
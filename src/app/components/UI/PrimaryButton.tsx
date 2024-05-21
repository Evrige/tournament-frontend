import React from 'react'

const PrimaryButton = ({title}: {title: string}) => {
	return (
		<button className="py-2 px-3 bg-primary text-bgSecondary rounded-[4px] my-3 mx-6">{title}</button>
	)
}

export default PrimaryButton
import React from 'react'

const AdminButton = ({title, borderColor}: {title: string, borderColor: string}) => {
	return (
		<button className={`py-2 px-3 bg-transparent border ${borderColor} text-accentText rounded-[4px] my-3`}>{title}</button>
	)
}

export default AdminButton
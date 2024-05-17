import React from 'react'

interface IProps {
	title: string
}
const AuthButton = ({title}: IProps) => {
	return (
		<button type="submit"
						className="bg-primary uppercase transform py-3 -skew-x-17 mt-9 text-bgSecondary hover:bg-accentText">
			{title}
		</button>
	)
}

export default AuthButton
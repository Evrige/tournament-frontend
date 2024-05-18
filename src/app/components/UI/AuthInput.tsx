import React from 'react'
import { ErrorMessage, Field } from 'formik'

interface IInputProps {
	labelText: string,
	type: string,
	placeholder: string,
	name: string,
}

const AuthInput = ({ labelText, type, placeholder, name }: IInputProps) => {
	return (
		<>
			<label htmlFor={name} className="my-2">{labelText}</label>
			<Field type={type} id={name} name={name} placeholder={placeholder}
						 className="outline-none bg-bgSecondary rounded-[4px] p-2 border border-gray-500 hover:border-primary transition-colors duration-300" />
			<ErrorMessage name={name} component="div" className="text-red-500 my-1" />
		</>
	)
}

export default AuthInput
import React, { useState } from 'react'
import { ErrorMessage, Field } from 'formik'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface IInputProps {
	labelText: string,
	placeholder: string,
	name: string,
	color?: string
}

const PasswordInput = ({ labelText, placeholder, name, color }: IInputProps) => {
	const [isCheckPassword, setIsCheckPassword] = useState(false)
	return (
		<div className="relative flex flex-col">
			<label htmlFor={name} className="my-3">{labelText}</label>
			<Field type={isCheckPassword ? 'text' : 'password'} placeholder={placeholder} id={name}
						 name={name}
						 className={`w-full outline-none ${color ? color : "bg-bgSecondary"} rounded-[4px] p-2 border border-transparent hover:border-primary transition-colors duration-300`} />
			<span className="absolute top-[60px] right-3 z-10"
						onClick={() => setIsCheckPassword(!isCheckPassword)}>
							{isCheckPassword ? <FaRegEyeSlash /> : <FaRegEye />}
						</span>
			<ErrorMessage name={name} component="div" className="text-red-500 my-1" />
		</div>
	)
}

export default PasswordInput
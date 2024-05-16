'use client'
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Page: NextPage = () => {
	const dic = useTranslations()
	const [isCheckPassword, setIsCheckPassword] = useState(false)
	const initialValues = {
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		email: Yup.string().email(dic('Auth.email')).required(dic('Auth.required')),
		password: Yup.string().required(dic('Auth.required'))
			.min(6, dic('Auth.passwordErrorMin'))
			.max(16, dic('Auth.passwordErrorMax'))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, dic('Auth.passwordError'))
	})

	// @ts-ignore
	const handleSubmit = (values, { setSubmitting }) => {
		setTimeout(() => {
			alert(JSON.stringify(values, null, 2))
			setSubmitting(false)
		}, 400)
	}
	return (
		<div className="flex justify-center items-center h-3/4">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="flex flex-col w-1/3">
					<h1 className="text-accentText text-4xl text-center mb-10">Login</h1>
					<label htmlFor="email">{dic('Auth.emailField')}</label>
					<Field type="email" id="email" name="email" placeholder={dic('Auth.emailField')}
								 className="outline-none  bg-bgSecondary rounded-[4px] py-1 px-2" />
					<ErrorMessage name="email" component="div" className="text-red-500" />
					<label htmlFor="password">{dic('Auth.password')}</label>
					<div className="relative flex">
						<Field type={isCheckPassword ? 'text' : 'password'} placeholder={dic('Auth.password')} id="password"
									 name="password"
									 className="outline-none bg-bgSecondary rounded-[4px] py-1 px-2 hover:border-primary" />
						<span className="absolute top-1 right-3 z-10"
									onClick={() => setIsCheckPassword(!isCheckPassword)}>
							{isCheckPassword ? <FaRegEyeSlash /> : <FaRegEye />}
						</span>
					</div>
					<ErrorMessage name="password" component="div" />
					<button type="submit">Submit</button>
				</Form>
			</Formik>
		</div>
	)
}

export default Page
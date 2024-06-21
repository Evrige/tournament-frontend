'use client'
import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'

import AuthInput from '@/app/components/UI/AuthInput'
import PasswordInput from '@/app/components/UI/PasswordInput'
import AuthButton from '@/app/components/UI/AuthButton'
import useLogin from '@/app/hooks/useLogin'
import { ILoginForm } from '@/app/types/form.interface'
import { useRouter } from 'next/navigation'
import GoogleButton from '@/app/components/UI/GoogleButton'
import { successNotify } from '@/app/utils/notification/successNotify'
import NotifyModal from '@/app/components/modals/NotifyModal'
import ReSendConfirmEmail from '@/app/components/ReSendConfirmEmail'

const Page: NextPage = () => {
	const dic = useTranslations()
	const router = useRouter()
	const login = useLogin()
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [modalText, setModalText] = useState('')
	const initialValues: ILoginForm = {
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

	const handleSubmit = async (values: ILoginForm) => {
		try {
			// @ts-ignore
			const result = await login.mutateAsync(values)
			if (result.status === 200) {
				successNotify(result.message)
				router.replace('/')
			}
		} catch (err) {
			setModalText(err.response.data.message)
			setIsModelOpen(true)
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ values }) => (
					<Form className="flex flex-col w-1/3">
						<h1 className="text-accentText text-4xl text-center mb-10">{dic('Auth.signIn')}</h1>
						<AuthInput labelText={dic('Auth.emailField')} type="email" placeholder={dic('Auth.emailField')}
											 name="email" />
						<PasswordInput labelText={dic('Auth.password')} placeholder={dic('Auth.password')} name="password" />
						<AuthButton title={dic('Auth.signIn')} />
						<p className="text-center mt-3 underline">{dic('Auth.forgotPassword')}</p>
						<div className="my-5">
							<GoogleButton />
						</div>
						{isModelOpen && <NotifyModal handleClose={() => setIsModelOpen((prev) => !prev)} route=""
																				 text={<ReSendConfirmEmail modalText={modalText} email={values.email} />} />}
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Page

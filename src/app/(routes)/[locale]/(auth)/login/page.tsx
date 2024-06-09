'use client'
import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { NextPage } from 'next'
import { useTranslations } from 'next-intl'

import AuthInput from '@/app/components/UI/AuthInput'
import PasswordInput from '@/app/components/UI/PasswordInput'
import AuthButton from '@/app/components/UI/AuthButton'
import useLogin from '@/app/hooks/useLogin'
import { ILoginForm } from '@/app/types/form.interface'
import { redirect, useRouter } from 'next/navigation'
import * as bcrypt from 'bcryptjs'
import GoogleButton from '@/app/components/UI/GoogleButton'

const Page: NextPage = () => {
	const dic = useTranslations()
	const router = useRouter()
	const login = useLogin()
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

	const handleSubmit =  async (values: ILoginForm,
															 { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		// @ts-ignore
		const result = await login.mutateAsync(values, {
			onSuccess: () => {
				setSubmitting(false);
				router.replace("/")
      }
		})
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
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
				</Form>
			</Formik>
		</div>
	)
}

export default Page

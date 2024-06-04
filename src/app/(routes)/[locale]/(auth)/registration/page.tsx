'use client'
import React from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { NextPage } from 'next'
import { useLocale, useTranslations } from 'next-intl'
import AuthInput from '@/app/components/UI/AuthInput'
import PasswordInput from '@/app/components/UI/PasswordInput'
import AuthButton from '@/app/components/UI/AuthButton'
import Link from 'next/link'
import { IRegisterForm } from '@/app/types/form.interface'
import useRegistration from '@/app/hooks/useRegistration'
import { redirect, useRouter } from 'next/navigation'
import * as bcrypt from 'bcryptjs'

const Page: NextPage = () => {
	const dic = useTranslations()
	const localeActive = useLocale()
	const registration = useRegistration()
	const router = useRouter()
	const initialValues: IRegisterForm = {
		email: '',
		nickname: '',
		password: '',
		confirmPassword: ''
	}

	const validationSchema = Yup.object({
		email: Yup.string().email(dic('Auth.email')).required(dic('Auth.required')),
		nickname: Yup.string()
			.required(dic('Auth.required'))
			.min(3, dic('Auth.nicknameMin'))
			.max(16, dic('Auth.nicknameMax'))
			.matches(/^[a-zA-Z0-9]+$/, dic('Auth.nicknameError')),
		password: Yup.string().required(dic('Auth.required'))
			.min(6, dic('Auth.passwordErrorMin'))
			.max(16, dic('Auth.passwordErrorMax'))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, dic('Auth.passwordError')),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], dic('Auth.confirmPasswordError'))
	})

	const handleSubmit =  async (values: IRegisterForm,
															 { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
		const { confirmPassword, ...formData } = values;

		const hashedPassword = await bcrypt.hash(values.password, 5)
		// @ts-ignore
		const result = await registration.mutateAsync({
			...formData,
			password: hashedPassword,
		}, {
			onSuccess: () => {
				setSubmitting(false);
				redirect("/")
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
					<h1 className="text-accentText text-4xl text-center mb-10">{dic('Auth.signUp')}</h1>
					<p className="text-center text-accentText">{dic('Auth.alreadyHaveAccount')}
						<Link
							href={`/${localeActive}/login`} locale={localeActive} className="text-primary"> {dic('Menu.signIn')}
						</Link>
					</p>
					<AuthInput labelText={dic('Auth.nickname')} type="text" placeholder={dic('Auth.nickname')}
										 name="nickname" />
					<AuthInput labelText={dic('Auth.emailField')} type="email" placeholder={dic('Auth.emailField')}
										 name="email" />
					<PasswordInput labelText={dic('Auth.password')} placeholder={dic('Auth.password')} name="password" />
					<PasswordInput labelText={dic('Auth.rePassword')} placeholder={dic('Auth.rePassword')}
												 name="confirmPassword" />
					<AuthButton title={dic('Auth.signUp')} />
				</Form>
			</Formik>
		</div>
	)
}

export default Page
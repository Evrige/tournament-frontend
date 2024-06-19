'use client'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import Loader from '@/app/(routes)/loader'
import AuthInput from '@/app/components/UI/AuthInput'
import { updateUserData } from '@/app/service/updateUserData'
import AuthButton from '@/app/components/UI/AuthButton'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { useUser } from '@/app/components/Providers/UserProvider'
import PasswordInput from '@/app/components/UI/PasswordInput'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { changePassword } from '@/app/service/changePassword'
import * as bcrypt from 'bcryptjs'
import { successNotify } from '@/app/utils/notification/successNotify'

const Page = () => {
	const { user, updateUser, isLoading } = useUser()
	const dic = useTranslations()

	const initialValues = {
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	}


	// @ts-ignore
	const handleSubmit = async (values, { resetForm, setFieldError }) => {
		const hashPassword = await bcrypt.hash(values.newPassword, 5)
		try {
			const updatePassword = await changePassword({
				currentPassword: values.currentPassword,
				newPassword: hashPassword
			})
			if (updatePassword.status === 200) {
				successNotify(updatePassword.message)
				resetForm()
			}
		} catch (e) {
			const [field, error] = e.response.data.message.split(' - ')
			setFieldError(field, error)
		}
	}

	const validationSchema = Yup.object({
		currentPassword: Yup.string().required(dic('Auth.required'))
			.min(6, dic('Auth.passwordErrorMin'))
			.max(16, dic('Auth.passwordErrorMax'))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, dic('Auth.passwordError')),
		newPassword: Yup.string().required(dic('Auth.required'))
			.min(6, dic('Auth.passwordErrorMin'))
			.max(16, dic('Auth.passwordErrorMax'))
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/, dic('Auth.passwordError')),
		confirmNewPassword: Yup.string()
			.oneOf([Yup.ref('newPassword')], dic('Auth.confirmPasswordError'))
	})

	return (
		<div className="ml-10 mt-3">
			<h1 className="text-2xl text-center text-accentText my-5">{dic('User.Settings.title')}</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form className="flex flex-col items-center w-full">
					<div className="flex flex-col min-w-[300px]">
						<PasswordInput labelText={dic('User.Security.currentPassword')}
													 placeholder={dic('User.Security.currentPassword')}
													 color="bg-bgPrimary" name="currentPassword" />
						<PasswordInput labelText={dic('User.Security.newPassword')}
													 placeholder={dic('User.Security.newPassword')}
													 color="bg-bgPrimary" name="newPassword" />
						<PasswordInput labelText={dic('User.Security.confirmNewPassword')}
													 placeholder={dic('User.Security.confirmNewPassword')}
													 color="bg-bgPrimary" name="confirmNewPassword" />
					</div>
					<div className="flex flex-col w-1/3">
						<AuthButton title={dic('User.Settings.button')} />
					</div>
				</Form>
			</Formik>
		</div>
	)
}

export default Page

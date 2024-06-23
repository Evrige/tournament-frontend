'use client'
import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Loader from '@/app/(routes)/loader'
import AuthInput from '@/app/components/UI/AuthInput'
import { updateUserData } from '@/app/service/updateUserData'
import AuthButton from '@/app/components/UI/AuthButton'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { useUser } from '@/app/components/Providers/UserProvider'

const Page = () => {
	const { user, updateUser, isLoading } = useUser()
	const dic = useTranslations()
	const [initialValues, setInitialValues] = useState({})

	useEffect(() => {
		if (user) {
			setInitialValues({
				nickname: user.nickname || '',
				name: user.name || '',
				lastname: user.lastname || '',
				avatar: user.avatar || ''
			})
		}
	}, [user])

	if (isLoading || !initialValues) return <Loader />

	// @ts-ignore
	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData()
		formData.append('nickname', values.nickname)
		formData.append('name', values.name)
		formData.append('lastname', values.lastname)
		formData.append('avatar', values.avatar)

		try {
			const response = await updateUserData(formData)
			console.log(response)
			if (response.status === 200)
				updateUser(response.user)
			resetForm()
		} catch (error) {
			console.error('Error updating user:', error)
		}
	}

	const validationSchema = Yup.object({
		nickname: Yup.string()
			.required(dic('Auth.required'))
			.min(3, dic('Auth.nicknameMin'))
			.max(16, dic('Auth.nicknameMax'))
			.matches(/^[a-zA-Z0-9]+$/, dic('Auth.nicknameError')),
		name: Yup.string().required(dic('Auth.required')),
		lastname: Yup.string().required(dic('Auth.required')),
		avatar: Yup.mixed().required(dic('Auth.required'))
	})

	return (
		<div className="ml-10 mt-3">
			<h1 className="text-2xl text-center text-accentText my-5">{dic('User.Settings.title')}</h1>
			{user && (
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ setFieldValue }) => (
						<Form className="flex flex-col items-center w-full">
							<div className="flex gap-2">
								<div className="flex flex-col">
									<label>{dic('User.Settings.avatar')}</label>
									<div className="my-3">
										<TeamUserLogo url={user?.avatar || ""} alt={"User avatar"} size="w-64 h-64" />
									</div>
									<input type="file" name="avatar" accept="image/png, image/jpeg" multiple={false} onChange={(e) => setFieldValue('avatar', e.target.files?.[0])} />
									<ErrorMessage name="avatar" component="div" className="error" />
								</div>
								<div className="flex flex-col min-w-[300px]">
									<AuthInput labelText={dic('User.Settings.nickname')} type="text"
														 placeholder={dic('User.Settings.nickname')}
														 name="nickname" color="bg-bgPrimary" />
									<AuthInput labelText={dic('User.Settings.name')} type="text" placeholder={dic('User.Settings.name')}
														 name="name" color="bg-bgPrimary" />
									<AuthInput labelText={dic('User.Settings.lastname')} type="text"
														 placeholder={dic('User.Settings.lastname')}
														 name="lastname" color="bg-bgPrimary" />
								</div>
							</div>
							<div className="flex flex-col w-1/3">
								<AuthButton title={dic("User.Settings.button")} />
							</div>
						</Form>
					)}
				</Formik>
			)}
		</div>
	)
}

export default Page

'use client'
import React from 'react'
import useUser from '@/app/hooks/useUser'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import useCreateGame from '@/app/hooks/useCreateGame'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { IRole, ITeam } from '@/app/types/db.interface'
import Loader from '@/app/(routes)/loader'
import AuthInput from '@/app/components/UI/AuthInput'
import { updateUser } from '@/app/service/updateUser'
import AuthButton from '@/app/components/UI/AuthButton'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'

const Page = () => {
	const { data: user, isLoading: userLoading } = useUser()
	const dic = useTranslations()
	const queryClient = useQueryClient()
	if (userLoading) return <Loader />

	const initialValue = {
		nickname: user?.nickname || '',
		name: user?.name || '',
		lastname: user?.lastname || '',
		// dateBirth: user?.dateBirth || '',
		avatar: user?.avatar || ''
	}
// @ts-ignore
	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData()
		formData.append('nickname', values.nickname)
		formData.append('name', values.name)
		formData.append('lastname', values.lastname)
		formData.append('avatar', values.avatar)
		// formData.append('dateBirth', values.dateBirth)
		try {
			const user = await updateUser(formData)
			const userU = await queryClient.invalidateQueries({ queryKey: ['user'] })
			console.log(userU)
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
		dateBirth: Yup.string().required(dic('Auth.required')),
		avatar: Yup.mixed().required(dic('Auth.required'))
	})

	return (
		<div className="ml-10 mt-3">
			<h1 className="text-2xl text-center text-accentText my-5">{dic('User.Settings.title')}</h1>
			<Formik
				initialValues={initialValue}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<Form className="flex flex-col items-center w-full">
						<div className="flex gap-2">
							<div className="flex flex-col">
								<label>{dic('User.Settings.avatar')}</label>
								<div className="my-3">
									<TeamUserLogo url={user?.avatar || "/public/logo.png"} alt={dic('User.avatar')} size="[200px]"/>
								</div>
								<input type="file" name="avatar" onChange={(e) => setFieldValue('avatar', e.target.files?.[0])} />
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
								{/*<AuthInput labelText={dic('User.Settings.dateBirth')} type="date"*/}
								{/*					 placeholder={dic('User.Settings.dateBirth')} name="dateBirth" color="bg-bgPrimary"/>*/}
							</div>
						</div>
						<div className="flex flex-col w-1/3">
							<AuthButton title={dic("User.Settings.button")} />
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Page

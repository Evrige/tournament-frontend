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

const Page = () => {
	const { data: user, isLoading: userLoading } = useUser()
	const dic = useTranslations()
	const queryClient = useQueryClient()
	const createGame = useCreateGame()
	if (userLoading) return <Loader />
	const initialValue = {
		nickname: user?.nickname || '',
		email: user?.email || '',
		name: user?.name || '',
		lastname: user?.lastname || '',
		dateBirth: user?.dateBirth || '',
		avatar: user?.avatar || ''
	}

	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('image', values.image)
		formData.append('logo', values.logo)
		console.log(values)
		try {
			await createGame.mutateAsync(formData)
			queryClient.invalidateQueries({ queryKey: ['user'] })
			resetForm()
		} catch (error) {
			console.error('Error creating game:', error)
		}
	}

	const validationSchema = Yup.object({
		email: Yup.string().email(dic('Auth.email')).required(dic('Auth.required')),
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
			<h1 className="text-2xl text-accentText my-3">{dic('User.Settings.title')}</h1>
			<Formik
				initialValues={initialValue}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<Form className="flex flex-col gap-2 w-1/3">
						<AuthInput labelText={dic('User.Settings.nickname')} type="text" placeholder={dic('User.Settings.nickname')}
											 name="nickname" color="bg-bgPrimary"/>
						<AuthInput labelText={dic('User.Settings.email')} type="email" placeholder={dic('User.Settings.email')}
											 name="email" color="bg-bgPrimary"/>
						<AuthInput labelText={dic('User.Settings.name')} type="text" placeholder={dic('User.Settings.name')}
											 name="name" color="bg-bgPrimary"/>
						<AuthInput labelText={dic('User.Settings.lastname')} type="text" placeholder={dic('User.Settings.lastname')}
											 name="lastname" color="bg-bgPrimary"/>
						<AuthInput labelText={dic('User.Settings.dateBirth')} type="date"
											 placeholder={dic('User.Settings.dateBirth')} name="dateBirth" color="bg-bgPrimary"/>
						<div>
							<label>{dic('User.Settings.avatar')}</label>
							<input type="file" name="avatar" onChange={(e) => setFieldValue('avatar', e.target.files?.[0])} />
							<ErrorMessage name="avatar" component="div" className="error" />
						</div>
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Page

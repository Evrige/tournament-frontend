"use client"
import React from 'react'
import useUser from '@/app/hooks/useUser'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import useCreateGame from '@/app/hooks/useCreateGame'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { IRole, ITeam } from '@/app/types/db.interface'

const Page = () => {
	const { data: user, isLoading: userLoading } = useUser()
	const dic = useTranslations()
	const queryClient  = useQueryClient()
	const initialValue = {
		nickname: '',
		email: '',
		password: '',
		name: '',
		lastname: '',
		dateBirth: '',
		avatar: '',
	}


	const createGame = useCreateGame()

	// @ts-ignore
	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('image', values.image);
		formData.append('logo', values.logo);
		console.log(values)
		try {
			// @ts-ignore
			await createGame.mutateAsync(formData);
			// Обновление кэша после успешного запроса
			queryClient.invalidateQueries({queryKey: ['games']});
			// Сброс формы после успешного создания игры
			resetForm();
		} catch (error) {
			console.error('Error creating game:', error);
		}
	};

	const validationSchema = Yup.object({
		name: Yup.string().required(dic('Auth.required')),
		image: Yup.mixed().required(dic('Auth.required')),
		logo: Yup.mixed().required(dic('Auth.required')),
	});
	return (
		<div>
			<Formik
				initialValues={initialValue}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue }) => (
					<Form className="">
						<div>
							<label>{dic('Game.name')}</label>
							<Field type="text" name="name" />
							<ErrorMessage name="name" component="div" className="error" />
						</div>
						<div>
							<label>{dic('Game.image')}</label>
							<input type="file" name="image" onChange={(e) => setFieldValue("image", e.target.files?.[0])} />
							<ErrorMessage name="image" component="div" className="error" />
						</div>
						<div>
							<label>{dic('Game.logo')}</label>
							<input type="file" name="logo" onChange={(e) => setFieldValue("logo", e.target.files?.[0])} />
							<ErrorMessage name="logo" component="div" className="error" />
						</div>
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Page
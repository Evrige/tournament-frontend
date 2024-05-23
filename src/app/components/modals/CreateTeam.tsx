import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import * as Yup from 'yup'
import { ErrorMessage, Form, Formik } from 'formik'
import useCreateTeam from '@/app/hooks/useCreateTeam'
import AuthInput from '@/app/components/UI/AuthInput'
import AuthButton from '@/app/components/UI/AuthButton'

interface IProps {
	handleClose: () => void
}

const CreateTeam = ({handleClose}: IProps) => {
	const dic = useTranslations()
	const queryClient = useQueryClient()
	const initialValue = {
		name: '',
		logo: ''
	}

	const createTeam = useCreateTeam()

	// @ts-ignore
	const handleSubmit = async (values, { resetForm }) => {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('logo', values.logo);
			// @ts-ignore
			const response = await createTeam.mutateAsync(formData);
			if(response.message === 'ok') {
				queryClient.invalidateQueries({queryKey: ['user']});
				resetForm();
				handleClose()
			}
	};

	const validationSchema = Yup.object({
		name: Yup.string().required(dic('Auth.required')),
		logo: Yup.mixed(),
	});



	return (
		<div className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
					onClick={()=> handleClose()}>
			<div className="relative flex flex-col items-center w-1/2 h-1/2 bg-bgPrimary rounded-[8px]"
					 onClick={(event)=> { event.stopPropagation()}}>
				<h1 className="text-3xl text-accentText my-10">{dic("User.Team.CreateTeamForm.formTitle")}</h1>
				<Formik
					initialValues={initialValue}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ setFieldValue }) => (
						<Form className="flex flex-col">
							<AuthInput labelText={dic("User.Team.CreateTeamForm.teamName")} type='text' placeholder={dic("User.Team.CreateTeamForm.teamName")} name="name"/>
							<>
								<label className="my-2">{dic("User.Team.CreateTeamForm.teamLogo")}</label>
								<input type="file" name="logo" onChange={(e) => setFieldValue("logo", e.target.files?.[0])} />
								<ErrorMessage name="logo" component="div" className="error" />
							</>
							<AuthButton title={dic("User.Team.CreateTeamForm.buttonTitle")}/>
						</Form>
					)}
				</Formik>
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer" onClick={()=> handleClose()}/>
			</div>
		</div>
	)
}

export default CreateTeam

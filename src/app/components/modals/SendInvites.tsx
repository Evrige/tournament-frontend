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

const SendInvites = ({handleClose}: IProps) => {
	const dic = useTranslations()
	const queryClient = useQueryClient()


	const createTeam = useCreateTeam()

	// const handleSubmit = async (values) => {
	//
	// 	if(response.message === 'ok') {
	// 		queryClient.invalidateQueries({queryKey: ['user']});
	//
	// 		handleClose()
	// 	}
	// };




	return (
		<div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
				 onClick={()=> handleClose()}>
			<div className="relative flex flex-col items-center w-1/2 h-1/2 bg-bgPrimary rounded-[8px]"
					 onClick={(event)=> { event.stopPropagation()}}>
			</div>
		</div>
	)
}

export default SendInvites

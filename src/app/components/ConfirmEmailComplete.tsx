"use client"
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Confirm from '@/app/components/modals/Confirm'

interface IProps {
	email: string
}

const ConfirmEmailComplete = ({email}: IProps) => {
	const dic = useTranslations()
	const [isOpen, setIsOpen] = useState(true)
	return (
		<>
			{isOpen ?  <Confirm handleClose={()=> setIsOpen((prev)=> !prev)} route="/login" text={dic.markup('ConfirmModal.emailActivated', {
				email })}/> : ""}
		</>
	)
}

export default ConfirmEmailComplete
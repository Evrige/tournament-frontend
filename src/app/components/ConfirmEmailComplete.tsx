"use client"
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import NotifyModal from '@/app/components/modals/NotifyModal'

interface IProps {
	email: string
}

const ConfirmEmailComplete = ({email}: IProps) => {
	const dic = useTranslations()
	const [isOpen, setIsOpen] = useState(true)
	return (
		<>
			{isOpen ?  <NotifyModal handleClose={()=> setIsOpen((prev)=> !prev)} route="/login" text={dic.markup('ConfirmModal.emailActivated', {
				email })}/> : ""}
		</>
	)
}

export default ConfirmEmailComplete
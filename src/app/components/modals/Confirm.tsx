import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import Button from '@/app/components/UI/Button'

interface IProps {
	handleClose: () => void,
	setIsConfirm: () => void
	email: string
}

const Confirm = ({handleClose, email, setIsConfirm}: IProps) => {
	const dic = useTranslations()

	return (
		<div className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
				 onClick={()=> {
					 handleClose()
					 setIsConfirm()
				 }}>
			<div className="relative flex flex-col items-center min-w-[200px] min-h-[100px] bg-bgPrimary rounded-[8px] p-5 pt-9"
					 onClick={(event)=> { event.stopPropagation()}}>
				<p>{dic.markup('ConfirmModal.email', {
					email })}
				</p>
				<div className="mt-4" onClick={()=> {
					handleClose()
					setIsConfirm()
				}}>
					<Button title={dic("ConfirmModal.confirm")} borderColor="border-primary"/>
				</div>
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer" onClick={()=> {
					handleClose()
					setIsConfirm()
				}}/>
			</div>
		</div>
	)
}

export default Confirm

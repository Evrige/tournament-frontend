import React, { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import BorderButton from '@/app/components/UI/BorderButton'
import { useRouter } from 'next/navigation'
import FillButton from '@/app/components/UI/FillButton'

interface IProps {
	handleClose: () => void
	handleAnswer: () => boolean
	text: string | ReactNode
}

const ConfirmModal = ({handleClose, text, handleAnswer}: IProps) => {
	const dic = useTranslations()

	const handleConfirm = () => {
		handleClose()
		handleAnswer(true)
	}

	const handleOut = () => {
		handleClose()
		handleAnswer(false)
	}

	return (
		<div className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
				 onClick={handleOut}>
			<div className="relative flex flex-col items-center min-w-[400px] max-w-[800px] min-h-[100px] bg-bgPrimary rounded-[8px] p-5 pt-9 text-center"
					 onClick={(event)=> { event.stopPropagation()}}>
				<p>{text}
				</p>
				<div className="mt-4 flex gap-5">
					<div onClick={handleConfirm}>
						<FillButton title={dic("ConfirmModal.confirmYes")} color="bg-primary"/>
					</div>
					<div onClick={handleOut}>
						<FillButton title={dic("ConfirmModal.confirmNo")} color="bg-red-500"/>
					</div>
				</div>
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer" onClick={handleOut}/>
			</div>
		</div>
	)
}

export default ConfirmModal

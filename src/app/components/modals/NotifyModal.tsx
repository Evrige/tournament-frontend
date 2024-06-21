import React, { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useTranslations } from 'next-intl'
import Button from '@/app/components/UI/Button'
import { useRouter } from 'next/navigation'

interface IProps {
	handleClose: () => void,
	route?: string
	text: string | ReactNode
}

const NotifyModal = ({handleClose, text, route}: IProps) => {
	const dic = useTranslations()
	const router = useRouter()
	const handleOut = () => {
		handleClose()
		route && router.replace(route)
	}
	return (
		<div className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex items-center justify-center z-30 overflow-hidden"
				 onClick={handleOut}>
			<div className="relative flex flex-col items-center min-w-[400px] max-w-[800px] min-h-[100px] bg-bgPrimary rounded-[8px] p-5 pt-9 text-center"
					 onClick={(event)=> { event.stopPropagation()}}>
				<p>{text}
				</p>
				<div className="mt-4"  onClick={handleOut}>
					<Button title={dic("ConfirmModal.confirm")} borderColor="border-primary"/>
				</div>
				<IoMdClose className="text-2xl absolute top-1 right-1 cursor-pointer"  onClick={handleOut}/>
			</div>
		</div>
	)
}

export default NotifyModal

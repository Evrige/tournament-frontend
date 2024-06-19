import React from 'react'
import { useTranslations } from 'next-intl'

const ReSendConfirmEmail = ({ modalText }: { modalText: string }) => {
	const dic = useTranslations()

	const handleReSend = async () => {
		const result = await ReSendConfirmEmail
	}
	return (
		<div>
			<p>{modalText}</p>
			<span>{dic('ConfirmModal.reSendConfirmEmail')}
				<button onClick={handleReSend}>
					{dic('ConfirmModal.reSendConfirmEmailYes')}
				</button>
			</span>
		</div>
	)
}

export default ReSendConfirmEmail
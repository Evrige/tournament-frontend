import React from 'react'
import { useTranslations } from 'next-intl'
import { reSendEmailToActivated } from '@/app/service/ReSendEmailToActivated'
import { successNotify } from '@/app/utils/notification/successNotify'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import { formatTimeMinutes } from '@/app/utils/formatTime'
import { useTimer } from '@/app/hooks/features/useTimer'

interface ReSendConfirmEmailProps {
	modalText: string
	email: string
}

const ReSendConfirmEmail: React.FC<ReSendConfirmEmailProps> = ({ modalText, email }) => {
	const dic = useTranslations()
	const { isTimerActive, timeLeft, startTimer } = useTimer(300)

	const handleReSend = async () => {
		if (isTimerActive) return
		try {
			const result = await reSendEmailToActivated({ email })
			if (result.status === 200) {
				successNotify(result.message)
				startTimer()
			}
		} catch (err) {
			errorNotify(err.response.message)
		}
	}

	return (
		<div>
			<p>{modalText}</p>
			<p>
				{dic('ConfirmModal.reSendConfirmEmail')}
				{isTimerActive ? (
					formatTimeMinutes(timeLeft)
				) : (
					<span onClick={handleReSend} className="underline text-gray-400 cursor-pointer">
            {dic('ConfirmModal.reSendConfirmEmailYes')}
          </span>
				)}
			</p>
		</div>
	)
}

export default ReSendConfirmEmail
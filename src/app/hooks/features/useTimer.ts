// @/app/hooks/useTimer.ts

import { useState, useEffect } from 'react'

export const useTimer = (initialTime: number) => {
	const [isTimerActive, setIsTimerActive] = useState(false)
	const [timeLeft, setTimeLeft] = useState(initialTime)

	useEffect(() => {
		let timer: NodeJS.Timeout
		if (isTimerActive && timeLeft > 0) {
			timer = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1)
			}, 1000)
		} else if (timeLeft === 0) {
			setIsTimerActive(false)
		}
		return () => clearInterval(timer)
	}, [isTimerActive, timeLeft])

	const startTimer = () => {
		setIsTimerActive(true)
		setTimeLeft(initialTime)
	}

	return { isTimerActive, timeLeft, startTimer }
}
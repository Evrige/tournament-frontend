import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useMessages, useTranslations } from 'next-intl'

const Faq = ({faq, index}: {faq: string, index: number}) => {
	const dic = useTranslations()
	const messages = useMessages()

	// @ts-ignore
	const dataKey = Object.keys(messages.Faq.data)
	// @ts-ignore
	const answers = Object.keys(messages.Faq.data[faq].answers)
	const [isOpen, setIsOpen] = useState(true)

	return (
		<ul className="pb-3 mr-24">
			<div
				className={`flex justify-between text-xl cursor-pointer hover:text-accentText ${!isOpen ? "text-accentText" : ""}`}
				onClick={() => setIsOpen((prev) => !prev)}>
				<h2>{index + 1}. {dic(`Faq.data.${faq}.name`)}</h2>
				<IoIosArrowDown className={`ml-0.5 mt-0.5 transform transition-transform duration-300 
											 ${!isOpen ? 'max-md:rotate-90 rotate-180' : 'max-md:-rotate-90 rotate-0'}`} />
			</div>
			{
				answers.map(answer => (
					<li key={answer}
							className={`ml-10 my-2 faq ${isOpen ? "" : "is-open"} `}>
						<div className="min-h-0">{dic(`Faq.data.${faq}.answers.${answer}`)}</div>
					</li>
				))
			}
		</ul>
	)
}

export default Faq
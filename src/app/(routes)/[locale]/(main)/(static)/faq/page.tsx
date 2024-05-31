'use client'
import React, { useState } from 'react'
import { useMessages, useTranslations } from 'next-intl'
import { IoIosArrowDown } from 'react-icons/io'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages()

	// @ts-ignore
	const dataKey = Object.keys(messages.Faq.data)

	return (
		<div className="bg-bgPrimary">
			<div className="px-5">
				<h2 className="text-2xl text-accentText font-bold py-4">{dic('Faq.title')}</h2>
				{dataKey.map((faq, index) => {
					// @ts-ignore
					const answers = Object.keys(messages.Faq.data[faq].answers)
					const [isOpen, setIsOpen] = useState(true)
					return (
						<ul key={faq} className="pb-3 mr-24">
							<div className={`flex justify-between text-xl cursor-pointer hover:text-accentText ${!isOpen ? "text-accentText" : ""}`}
							onClick={()=> setIsOpen((prev)=> !prev)}>
								<h2>{index + 1}. {dic(`Faq.data.${faq}.name`)}</h2>
								<IoIosArrowDown className={`ml-0.5 mt-0.5 transform transition-transform duration-300 
											 ${!isOpen ? 'max-md:rotate-90 rotate-180' : 'max-md:-rotate-90 rotate-0'}`} />
							</div>
							{
								answers.map(answer => (
									<li key={answer}
										className={`ml-10 my-2 faq ${isOpen ? "" : "is-open"} `}><div className="min-h-0">{dic(`Faq.data.${faq}.answers.${answer}`)}</div></li>
								))
							}
						</ul>
					)
				})}
			</div>
		</div>
	)
}

export default Page
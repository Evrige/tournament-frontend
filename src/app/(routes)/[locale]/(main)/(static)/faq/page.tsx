'use client'
import React, { useState } from 'react'
import { useMessages, useTranslations } from 'next-intl'
import { IoIosArrowDown } from 'react-icons/io'
import Faq from '@/app/components/Faq'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages()

	// @ts-ignore
	const dataKey = Object.keys(messages.Faq.data)

	return (
		<div className="bg-bgPrimary">
			<div className="px-5">
				<h2 className="text-2xl text-accentText font-bold py-4">{dic('Faq.title')}</h2>
				{dataKey.map((faq, index) =>
					<Faq faq={faq} index={index} key={faq}/>
				)}
			</div>
		</div>
	)
}

export default Page
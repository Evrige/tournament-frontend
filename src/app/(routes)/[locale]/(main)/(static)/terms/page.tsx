import React from 'react'
import { useMessages, useTranslations } from 'next-intl'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages()

	// @ts-ignore
	const dataKey = Object.keys(messages.Terms.data)
	return (
		<div className="min-h-full px-4 py-8 text-xl bg-bgPrimary">
			<h2 className="text-2xl text-accentText font-bold mb-4">{dic('Terms.title')}</h2>
			<p>{dic('Terms.intro')}</p>
			{dataKey.map((termsData, index) => (
				<div key={termsData} className="my-5">
					<p>{index + 1}. {dic(`Terms.data.${termsData}`)}</p>
				</div>
			))}
		</div>
	)
}

export default Page
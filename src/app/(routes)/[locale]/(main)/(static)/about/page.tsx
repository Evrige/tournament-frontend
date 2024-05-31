"use client"
import React from 'react'
import { useMessages, useTranslations } from 'next-intl'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages();

	// @ts-ignore
	const valuesKey = Object.keys(messages.AboutUs.OurValues.values);

	return (
		<section className="bg-bgPrimary">
			<div className="mx-6 py-6 border-b border-b-gray-700">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic('AboutUs.title')}</h2>
				<p dangerouslySetInnerHTML={{ __html: dic('AboutUs.paragraphs').replace(/\n/g, '<br>') }}></p>
			</div>
			<div className="mx-6 py-6 border-b border-b-gray-700">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic('AboutUs.OurValues.title')}</h2>
				<p className="mb-4">
					{dic('AboutUs.OurValues.intro')}
				</p>
				<ul className="list-disc pl-5 mb-4">
					{valuesKey.map((key) => (
						<li key={key} className="mb-2">
							<h2>{dic(`AboutUs.OurValues.values.${key}`)}</h2>
						</li>
					))}
				</ul>
			</div>
			<div className="mx-6 py-6 ">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic("AboutUs.OurHistory.title")}</h2>
				<p className="mb-4">
					{dic("AboutUs.OurHistory.paragraph")}
				</p>
			</div>
		</section>
	)
}

export default Page
import React from 'react'
import { useMessages, useTranslations } from 'next-intl'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages();

	// @ts-ignore
	const dataKey = Object.keys(messages.Privacy.data);
	return (
		<div className="bg-bgPrimary">
			<div className="mx-6 pt-6 text-2xl">
				<h2 className=" text-accentText font-bold mb-4">{dic('Privacy.title')}</h2>
				<p>{dic('Privacy.intro')}</p>
			</div>
			<div className="mx-6 py-6">
				<ul className="pl-5 mb-4">
					{dataKey.map((privacy, index) => (
						<li key={privacy} className="mb-2 text-xl my-3">
							<h3 className="text-2xl text-accentText mb-1">{index + 1}. {dic(`Privacy.data.${privacy}.name`)}</h3>
							<p>{dic(`Privacy.data.${privacy}.paragraph`)}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Page
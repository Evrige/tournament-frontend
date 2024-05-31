import React from 'react'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import { socialItems } from '@/app/constants/menuItems'
import { getUrl } from '@/app/utils/getUrl'
import Link from 'next/link'
import { partnersItems } from '@/app/constants/mainItems'
import Image from 'next/image'

const Page = () => {
	const dic = useTranslations()
	const messages = useMessages();
	const localeActive = useLocale()
	// @ts-ignore
	const membersKey = Object.keys(messages.Contacts.OurTeam.members);
	// @ts-ignore
	const contactsKey = Object.keys(messages.Contacts.Company.data);
	return (
		<div className="bg-bgPrimary">
			<div className="mx-6 py-6 border-b border-b-gray-700 flex flex-col gap-2">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic('Contacts.Company.title')}</h2>
				{contactsKey.map(contact => (
					<div key={contact} className="hover:text-accentText cursor-pointer flex gap-2">
						<p>{dic(`Contacts.Company.data.${contact}.title`)}</p>
						<p>{dic(`Contacts.Company.data.${contact}.data`)}</p>
					</div>
				))}
			</div>
			<div className="mx-6 py-6 border-b border-b-gray-700">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic("Contacts.OurTeam.title")}</h2>
				<p className="mb-4">
					{dic("Contacts.OurTeam.intro")}
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{membersKey.map(member => (
						<div key={member} className="bg-bgSecondary p-4 rounded shadow">
							<h3 className="text-xl font-bold mb-2">{dic(`Contacts.OurTeam.members.${member}.name`)}</h3>
							<p className="text-gray-700">{dic(`Contacts.OurTeam.members.${member}.role`)}</p>
						</div>
					))}
				</div>
			</div>
			<div className="mx-6 px-4 py-6 border-b border-b-gray-700 flex justify-between gap-3">
				{socialItems.map(social => (
					<Link key={social.name} title={dic(social.name)}
								href={getUrl(social.link, localeActive)} className={`text-3xl flex gap-2 hover:${social.color}`}>
						<p className="text-xl capitalize">{dic(social.name)}</p>
						{social.icon}
					</Link>
				))}
			</div>
			<div className="mx-6 py-6 border-b border-b-gray-700">
				<h2 className="text-2xl text-accentText font-bold mb-4">{dic("Contacts.Partners.title")}</h2>
				<div className="flex flex-wrap justify-center gap-4">
					{partnersItems.map(partner => (
						<Link key={partner.name} href={partner.link} className="shadow w-[350px] h-[200px]">
							<Image className="w-full h-full object-cover rounded-[8px]" src={partner.image} width={500} height={500} alt={partner.name}/>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Page
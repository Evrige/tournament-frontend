import { Metadata } from 'next'
import React from 'react'
import UserHeader from '@/app/components/UserHeader'


export const metadata: Metadata = {
	title: 'User page',
	description: '',
}
export default async function UserLayout({
																								 children,
																							 }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-bgSecondary min-h-[calc(100vh-85px)] pb-5">
			<UserHeader/>
				{children}
		</div>
	)
}


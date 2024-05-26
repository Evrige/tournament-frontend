import {Metadata} from "next";
import Aside from '@/app/components/Aside'
import React from 'react'

export const metadata: Metadata = {
	title: 'MTG',
	description: '',
}
export default function MainLayout({
																					children,
																				}: {
	children: React.ReactNode
}) {
	return (
		<main className="pt-[85px]">
			<Aside/>
			<div className="pl-[200px]">
				{children}
			</div>
		</main>
	)
}
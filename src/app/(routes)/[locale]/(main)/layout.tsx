import { Metadata } from 'next'
import Aside from '@/app/components/Aside'
import React from 'react'
import Logo from '@/app/components/Logo'
import { menuItems, moreItems } from '@/app/constants/headerItems'
import MenuItemLink from '@/app/components/UI/MenuItemLink'
import { FaFacebookSquare, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
	title: 'MTG',
	description: ''
}
export default function MainLayout({
																		 children
																	 }: {
	children: React.ReactNode
}) {
	return (
		<>
			<main className="pt-[85px]">
				<Aside />
				<div className="pl-[200px]">
					{children}
				</div>
			</main>
			<Footer/>
		</>
	)
}
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import '../../globals.css'
import { ThemeProvider } from 'next-themes'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import Header from '@/app/components/Header'
import Provider from '@/app/utils/Provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const noto = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'MTG',
	description: 'by Evrige',
	icons: {
		icon: '/favicon.ico',
		apple: '/favicon.ico'
	}
}

export default async function LocaleLayout({
																						 children,
																						 params: { locale }
																					 }: Readonly<{
	children: React.ReactNode;
	params: { locale: string }
}>) {
	const messages = await getMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
		<head>
			<link rel="icon" href="/favicon.ico" sizes="any" />
		</head>
		<body className={noto.className}>
		<Provider>
			<NextIntlClientProvider messages={messages}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<Header />
					{children}
				</ThemeProvider>
			</NextIntlClientProvider>
			<ToastContainer />
		</Provider>
		</body>
		</html>
	)
}

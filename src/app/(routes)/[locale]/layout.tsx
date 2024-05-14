import type {Metadata} from "next";
import { Noto_Sans} from "next/font/google";
import "../../globals.css";
import {ThemeProvider} from "next-themes";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import React from 'react'
import LocaleSwitcher from '@/app/components/LocaleSwitcher'

const noto = Noto_Sans({subsets: ["latin"]})

export const metadata: Metadata = {
	title: "MTG",
	description: "by Evrige",
	icons: {
		icon: "/favicon.ico",
		apple: "/favicon.ico"
	}
};

export default async function LocaleLayout({
																		 children,
																			 params: {locale}
																	 }: Readonly<{
	children: React.ReactNode;
	params: {locale:string}
}>) {
	const messages = await getMessages();
	return (
		<html lang={locale} suppressHydrationWarning>
		<head>
			<link rel="icon" href="/favicon.ico" sizes="any"/>
		</head>
		<body className={noto.className}>
		<NextIntlClientProvider messages={messages}>
			<ThemeProvider attribute="class" defaultTheme="system">
				{/*<header>*/}
				{/*	<LocaleSwitcher/>*/}
				{/*</header>*/}
				{children}
			</ThemeProvider>
		</NextIntlClientProvider>
		</body>

		</html>
	);
}

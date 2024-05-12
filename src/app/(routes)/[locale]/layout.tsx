import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../../globals.css";
import {ThemeProvider} from "next-themes";
import {getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import React from 'react'
import LocaleSwitcher from '@/app/components/locale-switcher'

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
	title: "MTG",
	description: "by Evrige",
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
		<body className={inter.className}>
			<NextIntlClientProvider messages={messages}>
				<ThemeProvider attribute="class" defaultTheme="system">
					<header>
						<LocaleSwitcher/>
					</header>
					{children}
				</ThemeProvider>
			</NextIntlClientProvider>
		</body>

		</html>
	);
}

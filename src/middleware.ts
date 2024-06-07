import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const defaultLocale = request.cookies.get("NEXT_LOCALE")?.value || 'en';
	const { pathname, search } = request.nextUrl;

	const locales = ['en', 'ru', 'ua'];

	const handleI18nRouting = createIntlMiddleware({
		locales: locales,
		defaultLocale
	});

	const isLocaleMissing = !locales.some((locale) =>
		pathname.startsWith(`/${locale}`)
	);
	
	if (isLocaleMissing) {
		return NextResponse.redirect(
			new URL(`/${defaultLocale}${pathname}${search}`, request.url)
		);
	}
	const response = handleI18nRouting(request);
	response.headers.set('x-your-custom-locale', defaultLocale);
	return response;
}

export const config = {
	matcher: [
		'/((?!api|_next|static|favicon.ico).*)'
	],
};

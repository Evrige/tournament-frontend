import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache'

export async function middleware(request: NextRequest) {
	const defaultLocale = request.cookies.get("NEXT_LOCALE")?.value || 'en';
	const token = request.cookies.has("refreshToken") || null;
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

	// if(pathname.includes("/login") || pathname.includes("/registration") && token) {
	// 	return NextResponse.redirect(
	// 		new URL(`/`, request.url)
	// 	);
	// }
	// if(pathname.includes("/user") && !token) {
	// 	return NextResponse.redirect(
	// 		new URL(`/login`, request.url)
	// 	);
	// }
	const response = handleI18nRouting(request);
	response.headers.set('x-your-custom-locale', defaultLocale);
	return response;
}

export const config = {
	matcher: [
		'/((?!api|_next|static|favicon.ico).*)'
	],
};

import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
	const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';

	// if (request.url.includes("/user")) {
	// 	let cookie = request.cookies.get('refreshToken')?.value;
	// 	console.log(cookie);
	// 	if (!cookie) {
	//
	// 		return  NextResponse.redirect(new URL('/', request.url));
	// 	}
	// }

	const handleI18nRouting = createIntlMiddleware({
		locales: ['en', 'ru', 'ua'],
		defaultLocale
	});
	const response = handleI18nRouting(request);
	response.headers.set('x-your-custom-locale', defaultLocale);
	return response;
}

export const config = {
	matcher: [
		'/',
		'/(ru|en|ua)/:path*'
	]
};

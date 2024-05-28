import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
	const defaultLocale = request.headers.get('x-your-custom-locale') || 'en';

	const url = request.nextUrl.clone();
	const { pathname } = url;

	if (
		PUBLIC_FILE.test(pathname)
	) {
		const response = NextResponse.next();
		response.headers.set(`x-middleware-cache`, `no-cache`);
		return response;
	}
	console.log(request.url)
	if (request.url.includes("/user")) {
		let cookie = request.cookies.has('refreshToken');
		console.log(cookie);
		if (!cookie) {
			const response = NextResponse.redirect(new URL('/', request.nextUrl.clone()));
			response.headers.set(`x-middleware-cache`, `no-cache`);
			return response;
		}
	}

	const handleI18nRouting = createIntlMiddleware({
		locales: ['en', 'ru', 'ua'],
		defaultLocale
	});
	const response = handleI18nRouting(request);
	response.headers.set('x-your-custom-locale', defaultLocale);
	response.headers.set(`x-middleware-cache`, `no-cache`);
	return response;

}

export const config = {
	matcher: [
		'/((?!_next).*)',
		'/',
		'/(ru|en|ua)/:path*'
	]
};

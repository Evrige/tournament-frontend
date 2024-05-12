import createMiddleware from 'next-intl/middleware';

export default createMiddleware({

	locales: ['en', 'ru',  'ua'],

	defaultLocale: 'ru'
});

export const config = {
	matcher: ['/', '/(ru|en|ua)/:path*']
};
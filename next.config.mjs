/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '',
				pathname: '/uploads/**',
			},
		],
	},
	experimental: {
		optimizePackageImports: [
			'next/head',
      'next/link',
      'next/image',
      'next/script',
      'next/style',
      'next/head',
      'next/script',
      'next/image',
      'next/link',
      'next/script',
      'next/style',
      'next/head',
      'next/script',
      'next/image',
      'next/link',
      'next/script',
      'next/style',
      'next/head',
      'next/script',
      'next/image',
      'next/link',
      'next/script',
      'next/style',
      'next/head',
      'next/script',
      'next/image',
      'next/link',
      'next/script',
		]
	}
};

export default withNextIntl(nextConfig);

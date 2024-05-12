import React from 'react';
import { useTranslations } from 'next-intl'

const Page = () => {
	const dic = useTranslations()
	return (
		<div>
			<div>{dic('Index.title')}</div>
		</div>
	);
};

export default Page;
import { differenceInYears, parse } from 'date-fns';
import { formatDateToString } from '@/app/utils/formatDateToString';
import { useTranslations } from 'next-intl'

function getYearWord(years: number) {
	const dic = useTranslations()
	if (years % 10 === 1 && years % 100 !== 11) {
		return dic("UserPage.Years.one");
	} else if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) {
		return dic("UserPage.Years.few");
	} else {
		return dic("UserPage.Years.many");
	}
}

export function calculateAge(dateBirth: Date): string {
	const date = parse(formatDateToString(dateBirth), "dd/MM/yyyy", new Date());
	const years = differenceInYears(new Date(), date);
	const yearWord = getYearWord(years);
	return `${years} ${yearWord}`;
}

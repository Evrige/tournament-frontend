'use client'
import { useLocale, useTranslations } from 'next-intl'
import useTournaments from '@/app/hooks/useTouraments'
import { getImageUrl } from '@/app/utils/getImageUrl'
import Image from 'next/image'
import { toPrice } from '@/app/utils/toPrice'
import { LiaMedalSolid } from 'react-icons/lia'
import { FaTicket } from 'react-icons/fa6'
import { AiOutlineTeam } from 'react-icons/ai'
import { format } from 'date-fns'
import { MdDateRange, MdLocationOn } from 'react-icons/md'
import Link from 'next/link'
import { getUrl } from '@/app/utils/getUrl'
import Tournaments from '@/app/components/Tournaments'
import FormCreateGame from '@/app/components/FormCreateGame'

export default function Home() {
	const dic = useTranslations()
	const localeActive = useLocale()


	// const { theme, setTheme } = useTheme()
	// const queryClient = useQueryClient();

	return (
		<div className="">
		</div>
	)
}

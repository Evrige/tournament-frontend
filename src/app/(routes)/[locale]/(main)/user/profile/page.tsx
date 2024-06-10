'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { getImageUrl } from '@/app/utils/getImageUrl'
import useUserData from '@/app/hooks/useUserData'
import { IoMdClose, IoMdPersonAdd } from 'react-icons/io'
import { menuUserItems } from '@/app/constants/menuItems'
import { RiGameLine } from 'react-icons/ri'
import { SlTrophy } from 'react-icons/sl'
import { FaChampagneGlasses } from 'react-icons/fa6'
import ProfileStats from '@/app/components/ProfileStats'
import BackgroundImage from '@/app/components/BackgroundImage'
import PageMenu from '@/app/components/PageMenu'
import Breadcrumbs from '@/app/components/Breadcrumbs'
import PrimaryButton from '@/app/components/UI/PrimaryButton'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import instance from '@/app/api/api.interseptor'
import { defaultNotify } from '@/app/utils/notification/defaultNotify'
import CreateTeam from '@/app/components/modals/CreateTeam'
import { useQueryClient } from '@tanstack/react-query'
import useTeamUsers from '@/app/hooks/useTeamUsers'
import { EnumRole, IUser } from '@/app/types/db.interface'
import SendInvites from '@/app/components/modals/SendInvites'
import Loader from '@/app/(routes)/loader'
import { leaveTeam } from '@/app/service/leaveTeam'
import { useUser } from '@/app/components/Providers/UserProvider'
import { errorNotify } from '@/app/utils/notification/errorNotify'
import { successNotify } from '@/app/utils/notification/successNotify'
import { getUser } from '@/app/service/getUser'
import CreateTeamSection from '@/app/components/CreateTeamSection'


const Page = () => {
	const dic = useTranslations()

	return (
		<div className="">

			<CreateTeamSection/>
		</div>
	)
}

export default Page
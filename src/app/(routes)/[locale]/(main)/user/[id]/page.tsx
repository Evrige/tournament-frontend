import React from 'react'
import { IUser } from '@/app/types/db.interface'
import TournamentPage from '@/app/components/TournamentPage'
import { getAllUserId } from '@/app/service/getAllUsers'
import { getUserById } from '@/app/service/getUserById'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { useTranslations } from 'next-intl'
import UserPage from '@/app/components/UserPage'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
	const users = await getAllUserId()

	return users.map((user:IUser) => ({
		id: user.id.toString(),
		fallback: true
	}))
}


const Page = async ({ params }: {params: {id: string}}) => {
	const user = await getUserById(params.id)

	return (
		<div className="p-5 bg-bgPrimary">
			<UserPage user={user}/>
		</div>
	);
};

export default Page;
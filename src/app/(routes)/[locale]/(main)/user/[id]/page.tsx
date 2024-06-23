import React from 'react'
import { IUser } from '@/app/types/db.interface'
import TournamentPage from '@/app/components/TournamentPage'
import { getAllUserId } from '@/app/service/getAllUsers'
import { getUserById } from '@/app/service/getUserById'

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
		<div>
			<p>{user.nickname}</p>
		</div>
	);
};

export default Page;
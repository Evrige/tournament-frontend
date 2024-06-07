import React from 'react'
import { activateEmail } from '@/app/service/activateEmail'
import { redirect } from 'next/navigation'

const Page =  async ({ searchParams }: {searchParams: {token: string}}) => {
	if (searchParams?.token){
		const data = await activateEmail(searchParams.token)
		if (data) {
			redirect("/login")
		}
	}
	return (
		<div>
		</div>
	)
}

export default Page
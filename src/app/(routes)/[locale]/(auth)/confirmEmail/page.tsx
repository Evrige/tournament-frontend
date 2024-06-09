import React from 'react'
import { activateEmail } from '@/app/service/activateEmail'
import ConfirmEmailComplete from '@/app/components/ConfirmEmailComplete'

const Page =  async ({ searchParams }: {searchParams: {token: string}}) => {
	let data;
	if (searchParams?.token){
		data = await activateEmail(searchParams.token)
	}
	return (
		<div>
			{data ? <ConfirmEmailComplete email={data.email}/> : null }
		</div>
	)
}

export default Page
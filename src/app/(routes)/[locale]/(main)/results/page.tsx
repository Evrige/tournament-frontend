import React from 'react'
import { getResult } from '@/app/service/getResult'
import TableResult from '@/app/components/TableResult'

const Page = async () => {
	const list = await getResult()
	return (
		<div>
			<TableResult list={list}/>
		</div>
	)
}

export default Page
import React from 'react'
import { getRating } from '@/app/service/getRating'
import TableRating from '@/app/components/TableRating'

const Page = () => {
	return (
		<div className="pb-5">
			<TableRating />
		</div>
	)
}

export default Page
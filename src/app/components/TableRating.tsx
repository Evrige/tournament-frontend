"use client"
import React, { useEffect, useState } from 'react'
import { IRating } from '@/app/types/db.interface'
import { useTranslations } from 'next-intl'
import { getRating } from '@/app/service/getRating'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { getImageUrl } from '@/app/utils/getImageUrl'

const TableRating = () => {
	const dic = useTranslations()
	const [tableType, setTableType] = useState("team")
	const [list, setList] = useState<IRating[]>([])
	const limitedList = list.slice(0, 10)

	useEffect(() => {
		const fetchData = async () => {
			if (tableType === 'team') {
				const data = await getRating("team");
				setList(data);
			} else {
				const data = await getRating("user");
				setList(data);
			}
		}
		fetchData();
	}, [tableType])

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl text-accentText mt-3">{tableType === "team" ? dic("Rating.teamTitle") : dic("Rating.userTitle")}</h1>
			<div className="flex space-x-4 mt-4">
				<button
					className={`px-4 py-2 bg-transparent hover:text-primary ${tableType === "team" ? "text-primary border-b border-b-primary" : ""}`}
					onClick={() => setTableType("team")}
				>
					{dic("Rating.teamButton")}
				</button>
				<button
					className={`px-4 py-2 hover:text-primary ${tableType === "user" ? "text-primary border-b border-b-primary" : ""}`}
					onClick={() => setTableType("user")}
				>
					{dic("Rating.userButton")}
				</button>
			</div>
			<table className="text-xl rounded-[8px] overflow-hidden bg-bgPrimary w-2/3 border border-gray-700 border-collapse mt-5 ml-5">
				<thead className="bg-bgTable text-accentText">
				<tr className="border-b border-gray-700">
					<th className="p-4">№</th>
					<th className="p-4 text-start">{tableType === "team" ? dic("Rating.Table.teamHead") : dic("Rating.Table.userHead")}</th>
					<th className="p-4">{dic("Rating.Table.point")}</th>
				</tr>
				</thead>
				<tbody>
				{limitedList.map((rating, index) => (
					<tr key={rating.id} className={`even:bg-bgSecondary ${index === limitedList.length - 1 ? '' : 'border-b border-gray-700'}`}>
						<td className="p-1 text-center">{index + 1}</td>
						<td className="p-4 flex gap-2 items-center">{tableType === "team" ?
							<><TeamUserLogo url={rating?.team?.logo} alt={dic("Rating.Table.teamLogo")}/>{rating?.team?.name}</> :
							<><TeamUserLogo url={rating?.user?.avatar} alt={dic("Rating.Table.userAvatar")}/>{rating?.user?.nickname}</>}</td>
						<td className="p-4 text-center">{rating?.points}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default TableRating
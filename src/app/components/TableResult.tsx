"use client"
import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { ITournament } from '@/app/types/db.interface'
import TeamUserLogo from '@/app/components/UI/TeamUserLogo'
import { formatDateTime } from '@/app/utils/formatDateTime'
import { toPrice } from '@/app/utils/toPrice'
import { useRouter } from 'next/navigation'

const TableResult = ({list}: {list: ITournament[]}) => {
	const dic = useTranslations()
	const limitedList = list.slice(0, 10)
	const router = useRouter()

	return (
		<div className="flex flex-col items-center">
			<h1
				className="text-3xl text-accentText mt-3">{dic("Result.Table.title")}</h1>
			<table
				className="text-xl rounded-[8px] overflow-hidden bg-bgPrimary w-2/3 border border-gray-700 border-collapse mt-5 ml-5">
				<tbody>
				{limitedList.reverse().map((tournament, index) => (
					<tr key={tournament.id} onClick={()=> router.push(`/tournaments/${tournament.id}`)}
							className={`even:bg-bgSecondary ${index === limitedList.length - 1 ? '' : 'border-b border-gray-700 cursor-pointer'}`}>
						<td className="p-4"><TeamUserLogo url={tournament?.game?.logo} alt={dic("Result.Table.gameLogo")}/></td>
						<td className="p-4">
							<div>
								<p className="text-accentText">{tournament?.name}</p>
								<p className="text-sm">{formatDateTime(tournament?.date)}</p>
							</div>
						</td>
						<td className="p-4">
							<div>
								<p className="text-accentText">{tournament?.teamCount}</p>
								<p className="text-sm">{dic('Result.Table.teams')}</p>
							</div>
						</td>
						<td className="p-4">
							<div>
								{/*// @ts-ignore*/}
								<p className="text-accentText">{toPrice(tournament?.prizePool || "-")}</p>
								<p className="text-sm">{dic('Result.Table.prizePool')}</p>
							</div>
						</td>
						<td className="p-4 capitalize text-accentText">{tournament.type}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default TableResult
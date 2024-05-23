import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import useCreateTeam from '@/app/hooks/useCreateTeam'
import { IoSearchSharp } from 'react-icons/io5'
import * as timers from 'node:timers'
import { findUsersByNickname } from '@/app/service/findUsersByNickname'
import { IUser } from '@/app/types/db.interface'

interface IProps {
	handleClose: () => void
}

const SendInvites = ({handleClose}: IProps) => {
	const dic = useTranslations()
	const queryClient = useQueryClient()
	const [usersList, setUsersList] = useState<IUser[]>([])

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	// const handleSubmit = async (values) => {
	//
	// 	if(response.message === 'ok') {
	// 		queryClient.invalidateQueries({queryKey: ['user']});
	//
	// 		handleClose()
	// 	}
	// };

	const debounce = (fn: (...args: any[]) => any, ms: number) => {
		let timeout: ReturnType<typeof setTimeout>;
		return function (this: any, ...args: Parameters<typeof fn>) {
			const fnCall = () => fn.apply(this, args);
			clearTimeout(timeout);
			timeout = setTimeout(fnCall, ms);
		};
	};
	const handleSearch = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value.length > 2) {
			const users = await findUsersByNickname(value)
			console.log(users)
		}
	}, 300);

	return (
		<div className="fixed inset-0 bg-opacity-30 bg-bgSecondary backdrop-blur-sm flex justify-center z-30 overflow-hidden"
				 onClick={()=> handleClose()}>
			<div className="relative flex flex-col items-center"
					 onClick={(event)=> { event.stopPropagation()}}>
				<div className="relative w-[280px] mt-64 h-auto">
					<input type="text" className="bg-bgTable rounded-t-[4px] p-1 w-full"
								 placeholder={dic("User.Team.searchInput")} onKeyUp={handleSearch}/>
					<IoSearchSharp className="text-lg absolute top-1.5 right-1"/>
				</div>
			</div>
		</div>
	)
}

export default SendInvites

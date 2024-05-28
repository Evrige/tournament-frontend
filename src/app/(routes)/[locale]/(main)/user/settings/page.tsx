"use client"
import React from 'react'
import useUser from '@/app/hooks/useUser'

const Page = () => {
	const { data: user, isLoading: userLoading } = useUser()
	return (
		<div>

		</div>
	)
}

export default Page
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const GoogleButton = () => {
	const handleGoogle = async () => {
		window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_AUTH_GOOGLE_URL}`
	}
	return (
		<button className="flex gap-3 justify-center items-center px-5 py-4 bg-bgPrimary rounded-full hover:text-accentText"
						onClick={handleGoogle}><FcGoogle className="text-2xl" />Sign in with Google</button>
	)
}

export default GoogleButton
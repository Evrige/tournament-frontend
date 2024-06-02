import { FaDiscord, FaFacebookSquare, FaInstagram, FaTelegram, FaTrophy, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { RiTeamFill } from 'react-icons/ri'
import { PiListNumbersBold } from 'react-icons/pi'
import { GiMedallist } from 'react-icons/gi'
import { TbHelp } from 'react-icons/tb'

export const menuUserItems = [
	{
		name: 'User.Menu.profile',
		link: 'profile'
	},
	{
		name: 'User.Menu.security',
		link: 'security'
	},
	{
		name: 'User.Menu.settings',
		link: 'settings'
	},
	{
		name: 'User.Menu.games',
		link: 'games'
	},
	{
		name: 'User.Menu.achievements',
		link: 'achievements'
	}
]

export const menuTournamentItems = [
	{
		name: 'Tournament.Menu.overview',
		link: '/'
	},
	{
		name: 'Tournament.Menu.bracket',
		link: 'bracket'
	},
	{
		name: 'Tournament.Menu.teams',
		link: 'teams'
	}
]

export const socialItems = [
	{
		name: 'Social.instagram',
		icon: <FaInstagram />,
		color: "hover:text-yellow-500",
		link: ''
	},
	{
		name: 'Social.youtube',
		icon: <FaYoutube/>,
		color: "hover:text-red-500",
		link: ''
	},
	{
		name: 'Social.twitter',
		icon: <FaFacebookSquare/>,
		color: "hover:text-shadowColor",
		link: ''
	},
	{
		name: 'Social.facebook',
		icon: <FaXTwitter />,
		color: "hover:text-shadowColor",
		link: ''
	},
	{
		name: 'Social.discord',
		icon: <FaDiscord />,
		color: "hover:text-gray-200",
		link: ''
	},
	{
		name: 'Social.telegram',
		icon: <FaTelegram />,
		color: "hover:text-shadowColor",
		link: ''
	}
]


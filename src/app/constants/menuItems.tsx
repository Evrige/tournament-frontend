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
		name: 'Footer.Social.instagram',
		icon: <FaInstagram className="text-2xl hover:text-yellow-500" />,
		link: ''
	},
	{
		name: 'Footer.Social.youtube',
		icon: <FaYoutube className="text-2xl hover:text-red-500"/>,
		link: ''
	},
	{
		name: 'Footer.Social.twitter',
		icon: <FaFacebookSquare className="text-2xl hover:text-shadowColor"/>,
		link: ''
	},
	{
		name: 'Footer.Social.facebook',
		icon: <FaXTwitter className="text-2xl hover:text-shadowColor"/>,
		link: ''
	},
	{
		name: 'Footer.Social.discord',
		icon: <FaDiscord className="text-2xl hover:text-gray-200" />,
		link: ''
	},
	{
		name: 'Footer.Social.telegram',
		icon: <FaTelegram  className="text-2xl hover:text-shadowColor"/>,
		link: ''
	}
]


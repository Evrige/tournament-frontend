import { IoMdHome } from 'react-icons/io'
import { FaTrophy } from 'react-icons/fa'
import { RiTeamFill } from 'react-icons/ri'
import { GiMedallist } from 'react-icons/gi'
import { PiListNumbersBold } from 'react-icons/pi'
import { TbHelp } from 'react-icons/tb'

export const asideItems = [
	{
		name: "Aside.home",
		icon: <IoMdHome />,
		link: ""
	},
	{
		name: "Aside.tournaments",
		icon: <FaTrophy />,
		link: "/tournaments"
	},
	{
		name: "Aside.teams",
		icon: <RiTeamFill />,
		link: "/teams"
	},
	{
		name: "Aside.rating",
		icon: <PiListNumbersBold />,
		link: "/rating"
	},
	{
		name: "Aside.results",
		icon: <GiMedallist />,
		link: "/results"
	},
	{
		name: "Aside.games",
		icon: "",
		link: "/games"
	},
	{
		name: "Aside.help",
		icon: <TbHelp />,
		link: "/faq"
	}
]
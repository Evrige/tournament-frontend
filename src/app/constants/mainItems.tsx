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
		link: "/user/profile"
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

export const partnersItems = [
	{
		name: "Contacts.Partners.hator",
		image: "/images/Hator.jpg",
		link: "https://hator.gg/ua/"
	},
	{
		name: "Contacts.Partners.rozetka",
		image: "/images/rozetka.jpg",
		link: "https://rozetka.com.ua/"
	},{
		name: "Contacts.Partners.steelSeries",
		image: "/images/steelseries.png",
		link: "https://ru.steelseries.com/"
	},{
		name: "Contacts.Partners.corsair",
		image: "/images/corsair.jpg",
		link: "https://www.corsair.com/ru/ru"
	},{
		name: "Contacts.Partners.asus",
		image: "/images/asus.jpg",
		link: "https://www.asus.com/ua-ua/"
	},
]
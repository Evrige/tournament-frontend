'use client'
import {useTheme} from 'next-themes'
import {useTranslations} from 'next-intl'
import Image from 'next/image'
import {menuItems} from "@/app/constants/headerItems";
import MenuItemDropDown from "@/app/components/UI/MenuItemDropDown";
import MenuItemLink from "@/app/components/UI/MenuItemLink";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import LocaleSwitcher from "@/app/components/LocaleSwitcher";

export default function Home() {
	const dic = useTranslations()
	const {theme, setTheme} = useTheme()
	return (
		<header className="bg-bgSecondary flex items-center justify-between h-[85px]">
			<Image src="/images/logo.png" alt={dic("Logo.alt")} width={200} height={200}></Image>
			<div className="flex items-center gap-10">
				<nav>
					<ul className="flex gap-5">
						{menuItems.map(item => (
							item.link === "dropDown" ?
								<MenuItemDropDown key={item.title} title={dic(item.title)}/> :
								<MenuItemLink key={item.title} link={item.link} title={dic(item.title)}/>
						))}
					</ul>
				</nav>
				<div>
					<button className="hover:bg-bgPrimary hover:text-accentText py-2 px-3 text-xl text-primary rounded-[8px] mr-5">{dic("Menu.signIn")}</button>
					<button className="hover:bg-accentText bg-primary py-2 px-3 text-xl text-bgSecondary rounded-[8px]">{dic("Menu.signUp")}</button>
				</div>
				<div>
					<FontAwesomeIcon icon={faGlobe} />
					<LocaleSwitcher/>
				</div>
			</div>
		</header>
		// <main className="">
		//   <div className="bg-amber-300 dark:bg-blue-700">Test theme</div>
		//   <div className=""></div>
		//   {/*<Test/>*/}
		//   <div>{dic('Index.title')}</div>
		//   <button onClick={() => setTheme('light')}>Light Mode</button>
		//   <button onClick={() => setTheme('dark')}>Dark Mode</button>
		// </main>
	);
}

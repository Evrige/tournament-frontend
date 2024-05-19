import {Metadata} from "next";
import Aside from '@/app/components/Aside'


export const metadata: Metadata = {
	title: 'MTG',
	description: '',
}
export default function MainLayout({
																					children,
																				}: {
	children: React.ReactNode
}) {
	return (
		<main className="pt-[85px]">
			<Aside/>
			{children}
		</main>
	)
}
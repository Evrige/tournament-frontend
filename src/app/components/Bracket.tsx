"use client"
import React, { useState } from 'react'
import { createTheme, Match, SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets/dist/cjs'
import { useTranslations } from 'next-intl'
import useWindowSize from '@g-loot/react-tournament-brackets/dist/cjs/hooks/use-window-size'
import { IMatch } from '@/app/types/db.interface'
import MatchModal from '@/app/components/modals/MatchModal'
import { IBracket } from '@/app/types/bracket.intreface'

// @ts-ignore
export const SingleElimination = ({matches}) => {
	const [width, height] = useWindowSize();
	const finalHeight = Math.max(height - 300, 500);
	const finalWidth = Math.max(width - 250, 600);
	const [isOpen, setIsOpen] = useState(false)
	const [match, setMatch] = useState()


	return(
		<div>
			<SingleEliminationBracket
				theme={GlootTheme}
				matches={matches}
				matchComponent={Match}
				svgWrapper={({children, ...props}) => (
					<SVGViewer
						width={finalWidth}
						height={finalHeight}
						background="rgb(11, 13, 19)"
						SVGBackground="rgb(11, 13, 19)"
						{...props}
					>
						{children}
					</SVGViewer>
				)}
				onMatchClick={(match) => {
					setIsOpen((prev) => !prev)
					// @ts-ignore
					setMatch(match.match)
				}}
				// onPartyClick={(match) => console.log(match)}
			/>
			{isOpen && match && <MatchModal matchData={match} handleClose={()=> setIsOpen((prev) => !prev)}/>}
		</div>

	);
}



const GlootTheme = createTheme({
	textColor: {main: "#000000", highlighted: "#F4F2FE", dark: "#707582"},
	matchBackground: {wonColor: "#2D2D59", lostColor: "#1B1D2D"},
	score: {
		background: {
			wonColor: `#10131C`,
			lostColor: "#10131C"
		},
		text: {highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94"}
	},
	border: {
		color: "#292B43",
		highlightedColor: "RGBA(152,82,242,0.4)"
	},
	roundHeader: {backgroundColor: "#3B3F73", fontColor: "#F4F2FE"},
	connectorColor: "#3B3F73",
	connectorColorHighlight: "RGBA(152,82,242,0.4)",
	svgBackground: "#0F121C"
});

// @ts-ignore
const Bracket = ({matches}) => {
	const dic = useTranslations()
	return (
		<div className="p-5">
				<h1 className="my-3 text-accentText text-3xl">{dic("Tournament.Bracket.bracketTitle")}</h1>
				<SingleElimination matches={matches}/>
		</div>
	)
}

export default Bracket
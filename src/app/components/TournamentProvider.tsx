"use client"
import React, { createContext } from 'react';
import { ITournament } from '@/app/types/db.interface';

interface TournamentContextType {
	tournament: ITournament;
	updateTournament: (tournament: ITournament) => void;
}

const TournamentContext = createContext<TournamentContextType>({
	tournament: {} as ITournament,
	updateTournament: () => {},
});

export const TournamentProvider: React.FC<{ tournament: ITournament; children: React.ReactNode }> = ({
																																																			 tournament: initialTournament,
																																																			 children,
																																																		 }) => {
	const [tournament, setTournament] = React.useState<ITournament>(initialTournament);

	const updateTournament = (updatedTournament: ITournament) => {
		setTournament(updatedTournament);
	};

	return (
		<TournamentContext.Provider value={{ tournament, updateTournament }}>
			{children}
		</TournamentContext.Provider>
	);
};

export const useTournament = () => React.useContext(TournamentContext);

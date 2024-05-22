import { IMap, ITournament } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'
import { useQuery } from '@tanstack/react-query'

export const fetchTournament = async (id: string): Promise<ITournament> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_TOURNAMENT_BY_ID_URL}/${id}`,
		method: 'GET',
	});
	return response.data;
};

const useTournamentById = (id: string) => {
	return useQuery<ITournament, Error>({
		queryKey: ['tournament', id],
		queryFn: () => fetchTournament(id),
		gcTime: 10000,
		staleTime: 10000
	});
};

export default useTournamentById;
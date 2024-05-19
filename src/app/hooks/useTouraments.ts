import { useQuery } from '@tanstack/react-query'
import { ITournament } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

const fetchGames = async (): Promise<ITournament[]> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_TOURNAMENT_URL,
		method: 'GET',
	});
	return response.data;
};

const useTournaments = () => {
	return useQuery<ITournament[], Error>({queryKey: ['tournaments'], queryFn: fetchGames});
};

export default useTournaments;

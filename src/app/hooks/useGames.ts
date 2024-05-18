import { useQuery, QueryFunctionContext } from '@tanstack/react-query';
import { IGame } from '@/app/types/db.interface'
import instance from '@/app/api/api.interseptor'

const fetchGames = async (): Promise<IGame[]> => {
	const response = await instance({
		url: process.env.NEXT_PUBLIC_CREATE_GET_GAMES_URL,
		method: 'GET',
	});
	return response.data;
};

const useGames = () => {
	return useQuery<IGame[], Error>({queryKey: ['games'], queryFn: fetchGames});
};

export default useGames;

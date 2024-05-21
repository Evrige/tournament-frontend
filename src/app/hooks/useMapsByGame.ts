import { useQuery } from '@tanstack/react-query';
import { IMap } from '@/app/types/db.interface';
import instance from '@/app/api/api.interseptor';

const fetchMapsByGame = async (gameId: string): Promise<IMap[]> => {
	try {
		const response = await instance({
			url: process.env.NEXT_PUBLIC_GET_MAPS_BY_GAME_ID_URL,
			method: 'GET',
			params: { id: gameId },
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch maps by game');
	}
};

const useMapsByGame = (gameId: string) => {
	return useQuery<IMap[], Error>({
		queryKey: ['maps', gameId],
		queryFn: () => fetchMapsByGame(gameId),
	});
};

export default useMapsByGame;

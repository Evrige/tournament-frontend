import { useQuery } from '@tanstack/react-query';
import { IMap } from '@/app/types/db.interface';
import instance from '@/app/api/api.interseptor';

const fetchMapsByGame = async (gameId: string): Promise<IMap[]> => {
	const response = await instance({
		url: `${process.env.NEXT_PUBLIC_GET_MAPS_BY_GAME_ID_URL}/${gameId}`,
		method: 'GET',
	});
	return response.data;
};

const useMapsByGame = (gameId: string) => {
	return useQuery<IMap[], Error>({
		queryKey: ['maps', gameId],
		queryFn: () => fetchMapsByGame(gameId),
	});
};

export default useMapsByGame;

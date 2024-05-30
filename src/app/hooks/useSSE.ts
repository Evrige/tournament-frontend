import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/app/types/db.interface'

const useSSE = () => {
	const queryClient = useQueryClient();
	const [sseData, setSseData] = useState<IUser>();

	useEffect(() => {
		const createEventSource = (url: string) => {
			const eventSourceInitDict = { withCredentials: true };
			return new EventSource(url, eventSourceInitDict);
		};

		const eventSource = createEventSource('http://localhost:5000/api/user/sse');

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSseData(data.user);
			if (data.user) queryClient.setQueryData(['user'], data.user);
		};

		eventSource.onerror = (error) => {
			console.error('Ошибка SSE:', error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, [queryClient]);

	return sseData;
};

export default useSSE;

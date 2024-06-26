import { useEffect, useState } from 'react';
import { IUser } from '@/app/types/db.interface'

const useSSE = () => {
	const [sseData, setSseData] = useState<IUser>();

	useEffect(() => {
		const createEventSource = (url: string) => {
			const eventSourceInitDict = { withCredentials: true };
			return new EventSource(url, eventSourceInitDict);
		};
		const eventSource = createEventSource(`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_USER_SSE_URL}`);

		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setSseData(data.user);
		};

		eventSource.onerror = (error) => {
			console.error('Ошибка SSE:', error);
			eventSource.close();
		};

		return () => {
			eventSource.close();
		};
	}, []);

	return sseData;
};

export default useSSE;

